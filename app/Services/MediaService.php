<?php

namespace App\Services;

use App\Events\MediaUploaded;
use App\Events\MediaUploadProgress;
use App\Models\Event;
use App\Models\EventTranslation;
use App\Models\Media;
use App\Models\News;
use App\Models\NewsTranslation;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Encoders\PngEncoder;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\JpegEncoder;
use Intervention\Image\Encoders\WebpEncoder;

class MediaService
{
    private ImageManager $manager;

    public function __construct()
    {
        $this->manager = new ImageManager(new Driver());
    }

    private const IMAGE_VERSIONS = [
        'original' => null,
        'thumbnail' => [400, 300],
        'blur' => [40, 30]
    ];

    /**
     * Upload single file - otomatis menggunakan processAndUploadImage untuk gambar
     */
    public function upload(UploadedFile $file): Media
    {
        try {
            if ($this->isImage($file)) {
                // Untuk gambar, gunakan processAndUploadImage
                $paths = $this->processAndUploadImage($file);
                return $this->createMediaRecord($file, $paths);
            } else {
                // Untuk non-gambar, upload langsung
                return $this->uploadNonImageFile($file);
            }
        } catch (Exception $e) {
            Log::error('File upload error: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Upload batch files - otomatis menggunakan processAndUploadImage untuk gambar
     */
    public function create(array $files, string $userId): array
    {
        $results = [];
        $errors = [];
        $uploadId = Str::uuid();

        foreach ($files as $file) {
            try {
                $this->broadcastProgress($uploadId, $file->getClientOriginalName(), 0, null, $userId);

                if ($this->isImage($file)) {
                    // Untuk gambar, gunakan processAndUploadImage
                    $paths = $this->processAndUploadImage($file);
                    $media = $this->createMediaRecord($file, $paths);
                } else {
                    // Untuk non-gambar, upload langsung
                    $media = $this->uploadNonImageFile($file);
                }

                $results[] = $media;
                $this->broadcastProgress($uploadId, $file->getClientOriginalName(), 100, $media, $userId);

            } catch (Exception $e) {
                $this->handleError($uploadId, $file, $e, $errors, $userId);
            }
        }

        return [
            'uploaded' => $results,
            'failed' => $errors
        ];
    }

    /**
     * Upload file dengan compress (legacy method - sekarang menggunakan processAndUploadImage untuk gambar)
     */
    public function uploadFileWithCompress(UploadedFile $file, int $quality = 80): Media
    {
        try {
            if ($this->isImage($file)) {
                // Untuk gambar, gunakan processAndUploadImage (ignore quality parameter)
                $paths = $this->processAndUploadImage($file);
                return $this->createMediaRecord($file, $paths);
            } else {
                // Untuk non-gambar, upload langsung
                return $this->uploadNonImageFile($file);
            }
        } catch (Exception $e) {
            Log::error('File upload error: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Upload batch dengan compress (legacy method - sekarang menggunakan processAndUploadImage untuk gambar)
     */
    public function uploadBatchWithCompress(array $files, string $userId, int $quality = 80): array
    {
        $results = [];
        $errors = [];
        $uploadId = Str::uuid();

        foreach ($files as $file) {
            try {
                $this->broadcastProgress($uploadId, $file->getClientOriginalName(), 0, null, $userId);

                if ($this->isImage($file)) {
                    // Untuk gambar, gunakan processAndUploadImage (ignore quality parameter)
                    $paths = $this->processAndUploadImage($file);
                    $media = $this->createMediaRecord($file, $paths);
                } else {
                    // Untuk non-gambar, upload langsung
                    $media = $this->uploadNonImageFile($file);
                }

                $results[] = $media;
                $this->broadcastProgress($uploadId, $file->getClientOriginalName(), 100, $media, $userId);

            } catch (Exception $e) {
                $this->handleError($uploadId, $file, $e, $errors, $userId);
            }
        }

        return [
            'uploaded' => $results,
            'failed' => $errors
        ];
    }

    /**
     * Process dan upload gambar dengan 3 versi (original, thumbnail, blur)
     */
    public function processAndUploadImage($file): array
    {
        $baseFileName = Str::uuid() . '_' . time();
        $extension = $file->getClientOriginalExtension();
        $paths = [];

        try {
            $image = $this->manager->read($file);

            foreach (self::IMAGE_VERSIONS as $version => $dimensions) {
                $processedImage = clone $image;

                if ($dimensions) {
                    $processedImage->resize($dimensions[0], $dimensions[1], function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });

                    if ($version === 'blur') {
                        $processedImage->blur(50);
                    }
                }

                $quality = $this->getQualityByVersion($version);

                $path = sprintf(
                    'media/%s/%s/%s_%s.%s',
                    date('Y'),
                    $version,
                    $baseFileName,
                    $version,
                    $extension
                );

                // Encode berdasarkan mime type
                $encoder = $this->getEncoderByMimeType($file->getMimeType(), $quality);
                $imageData = $processedImage->encode($encoder);

                Storage::disk('minio')->put(
                    $path,
                    $imageData,
                    ['CacheControl' => 'public, max-age=31536000']
                );

                $paths[$version] = $this->getMinioUrl($path);
            }

            return $paths;

        } catch (Exception $e) {
            Log::error('Image processing error: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Upload file non-gambar langsung tanpa processing
     */
    private function uploadNonImageFile(UploadedFile $file): Media
    {
        $randomFileName = Str::uuid() . '_' . time() . '.' . $file->getClientOriginalExtension();
        $randomSubdirectory = 'media/' . date('Y') . '/' . date('m');
        $path = sprintf('%s/%s', $randomSubdirectory, $randomFileName);

        Storage::disk('minio')->putFileAs(
            dirname($path),
            $file,
            basename($path)
        );

        $fullUrl = $this->getMinioUrl($path);

        $media = Media::create([
            'name' => $file->getClientOriginalName(),
            'file_name' => $randomFileName,
            'mime_type' => $file->getMimeType(),
            'path' => $fullUrl,
            'size' => $file->getSize()
        ]);

        event(new MediaUploaded($media));

        return $media;
    }

    /**
     * Cek apakah file adalah gambar
     */
    private function isImage(UploadedFile $file): bool
    {
        return str_starts_with($file->getMimeType(), 'image/');
    }

    /**
     * Get encoder berdasarkan mime type
     */
    private function getEncoderByMimeType(string $mimeType, int $quality): JpegEncoder|PngEncoder|WebpEncoder
    {
        return match ($mimeType) {
            'image/jpeg' => new JpegEncoder($quality),
            'image/png' => new PngEncoder(),
            'image/webp' => new WebpEncoder($quality),
            default => new JpegEncoder($quality)
        };
    }

    /**
     * Get quality berdasarkan versi gambar
     */
    private function getQualityByVersion(string $version): int
    {
        return match($version) {
            'original' => 90,
            'thumbnail' => 80,
            'blur' => 30,
            default => 90
        };
    }

    /**
     * Generate MinIO URL
     */
    private function getMinioUrl(string $path): string
    {
        return sprintf(
            '%s/%s/%s',
            config('filesystems.disks.minio.url'),
            config('filesystems.disks.minio.bucket'),
            $path
        );
    }

    /**
     * Create media record dengan paths untuk gambar
     */
    private function createMediaRecord($file, array $paths): Media
    {
        $media = Media::create([
            'name' => $file->getClientOriginalName(),
            'file_name' => basename($paths['original']),
            'mime_type' => $file->getMimeType(),
            'path' => $paths['original'],
            'paths' => $paths,
            'size' => $file->getSize()
        ]);

        event(new MediaUploaded($media));

        return $media;
    }

    /**
     * Broadcast progress untuk real-time upload
     */
    private function broadcastProgress(
        string $uploadId,
        string $fileName,
        int $progress,
        ?Media $media,
        string $userId,
        ?string $error = null
    ): void {
        broadcast(new MediaUploadProgress(
            uploadId: $uploadId,
            fileName: $fileName,
            progress: $progress,
            isComplete: $progress === 100,
            media: $media,
            userId: $userId,
            error: $error
        ));
    }

    /**
     * Handle error saat upload
     */
    private function handleError($uploadId, $file, Exception $e, array &$errors, $userId): void
    {
        $errors[] = [
            'file' => $file->getClientOriginalName(),
            'error' => $e->getMessage()
        ];

        $this->broadcastProgress(
            $uploadId,
            $file->getClientOriginalName(),
            0,
            null,
            $userId,
            $e->getMessage()
        );
    }

    // === EXISTING METHODS (unchanged) ===

    public function getAll()
    {
        return Media::latest()->limit(50)->get();
    }

    public function delete($id)
    {
        return Media::findOrFail($id)->delete();
    }

    public function getPaginated(int $perPage = 20, string $sortBy = 'created_at', string $sortOrder = 'desc', ?string $search = null)
    {
        $query = Media::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('mime_type', 'like', "%{$search}%");
            });
        }

        $validSortColumns = ['created_at', 'name', 'size', 'mime_type'];
        if (in_array($sortBy, $validSortColumns)) {
            $query->orderBy($sortBy, $sortOrder === 'asc' ? 'asc' : 'desc');
        } else {
            $query->latest();
        }

        return $query->paginate($perPage)->withQueryString();
    }

    public function update(Media $media, string $name)
    {
        try {
            $media->update([
                'name' => $name
            ]);

            return $media->fresh();
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function deleteById(Media $media): array
    {
        try {
            $usageCheck = $this->checkMediaUsage($media);

            if ($usageCheck['isUsed']) {
                throw new Exception("Media sedang digunakan di: " . $usageCheck['usedIn']);
            }

            // Delete all image versions if exists
            if ($media->paths) {
                foreach ($media->paths as $version => $path) {
                    $relativePath = str_replace(
                        config('filesystems.disks.minio.url') . '/' . config('filesystems.disks.minio.bucket') . '/',
                        '',
                        $path
                    );

                    Storage::disk('minio')->delete($relativePath);
                }
            }

            // Delete single path if exists
            if ($media->path) {
                $relativePath = str_replace(
                    config('filesystems.disks.minio.url') . '/' . config('filesystems.disks.minio.bucket') . '/',
                    '',
                    $media->path
                );
                Storage::disk('minio')->delete($relativePath);
            }

            $media->delete();

            return [
                'success' => true,
                'message' => 'Media berhasil dihapus'
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    private function checkMediaUsage(Media $media): array
    {
        $usedIn = [];

        $usedInEvents = Event::where('media_id', $media->id)->first();
        if ($usedInEvents) {
            $usedIn[] = "Event (" . $usedInEvents->translations()
                    ->whereHas('language', function($q) {
                        $q->where('code', 'id');
                    })
                    ->first()?->title . ")";
        }

        $eventTranslations = EventTranslation::whereRaw('content LIKE ?', ['%' . $media->id . '%'])->first();
        if ($eventTranslations) {
            $usedIn[] = "Konten Event (" . $eventTranslations->event->translations()
                    ->whereHas('language', function($q) {
                        $q->where('code', 'id');
                    })
                    ->first()?->title . ")";
        }

        $usedInNews = News::where('media_id', $media->id)->first();
        if ($usedInNews) {
            $usedIn[] = "News (" . $usedInNews->translations()
                    ->whereHas('language', function($q) {
                        $q->where('code', 'id');
                    })
                    ->first()?->title . ")";
        }

        $newsTranslations = NewsTranslation::whereRaw('content LIKE ?', ['%' . $media->id . '%'])->first();
        if ($newsTranslations) {
            $usedIn[] = "Konten News (" . $newsTranslations->news->translations()
                    ->whereHas('language', function($q) {
                        $q->where('code', 'id');
                    })
                    ->first()?->title . ")";
        }

        return [
            'isUsed' => count($usedIn) > 0,
            'usedIn' => implode(", ", $usedIn)
        ];
    }
}
