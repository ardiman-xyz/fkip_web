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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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


    public function upload(UploadedFile $file)
    {
        try {
            $randomFileName = Str::uuid() . '_' . time() . '.' . $file->getClientOriginalExtension();

            $randomSubdirectory = 'media/' . date('Y') . '/' . date('m');

            $path = $file->storeAs($randomSubdirectory, $randomFileName, 'public');

            $media = Media::create([
                'name' => $file->getClientOriginalName(),
                'file_name' => $randomFileName,
                'mime_type' => $file->getMimeType(),
                'path' => $path,
                'size' => $file->getSize()
            ]);

            event(new MediaUploaded($media));

            return $media;

        } catch (Exception $e) {
            throw $e;
        }
    }


    public function getAll()
    {
        return Media::latest()->limit(50)->get();
    }

    public function delete($id)
    {
        return Media::findOrFail($id)->delete();
    }


    public function create(array $files, string $userId): array
    {
        $results = [];
        $errors = [];
        $uploadId = Str::uuid();

        foreach ($files as $file) {
            try {
                $this->broadcastProgress($uploadId, $file->getClientOriginalName(), 0, null, $userId);

                $paths = $this->processAndUploadImage($file);

                $media = $this->createMediaRecord($file, $paths);

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

                $imageData = $processedImage->encode(new JpegEncoder($quality));

                Storage::disk('minio')->put(
                    $path,
                    $imageData,
                    ['CacheControl' => 'public, max-age=31536000']
                );

                $paths[$version] = $this->getMinioUrl($path);
            }

            return $paths;

        } catch (Exception $e) {
            \Log::error('Image processing error: ' . $e->getMessage());
            throw $e;
        }
    }


    private function getQualityByVersion(string $version): int
    {
        return match($version) {
            'original' => 90,
            'thumbnail' => 80,
            'blur' => 30,
            default => 90
        };
    }

    private function getMinioUrl(string $path): string
    {
        return sprintf(
            '%s/%s/%s',
            config('filesystems.disks.minio.url'),
            config('filesystems.disks.minio.bucket'),
            $path
        );
    }

    private function createMediaRecord($file, array $paths): Media
    {
        return Media::create([
            'name' => $file->getClientOriginalName(),
            'file_name' => basename($paths['original']),
            'mime_type' => $file->getMimeType(),
            'path' => $paths['original'],
            'paths' => $paths,
            'size' => $file->getSize()
        ]);
    }

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

    public function update(Media $media, string $name)
    {
        try {

            $newName = $name;

            $media->update([
                'name' => $newName
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

        // Check in news
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
