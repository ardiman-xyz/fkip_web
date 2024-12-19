<?php

namespace App\Events;

use App\Models\Media;
use App\Services\MediaService;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Http\File;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProcessMediaUpload implements ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        private string $tempPath,
        private string $originalName,
        private string $mimeType,
        private int $size,
        private int $userId,
        private string $uploadId
    ) {}

    public function handle(MediaService $mediaService): void
    {
        try {
            // Broadcast start
            broadcast(new MediaUploadProgress(
                uploadId: $this->uploadId,
                fileName: $this->originalName,
                progress: 0,
                isComplete: false,
                media: null,
                userId: $this->userId
            ));

            // Proses image dan generate semua versi
            $paths = $mediaService->processAndUploadImage(
                new File($this->tempPath)
            );

            // Create media record dengan semua paths
            $media = Media::create([
                'name' => pathinfo($this->originalName, PATHINFO_FILENAME),
                'file_name' => basename($paths['original']),
                'mime_type' => $this->mimeType,
                'path' => $paths['original'],
                'paths' => $paths,
                'size' => $this->size,
            ]);

            // Clean up temp file
            if (file_exists($this->tempPath)) {
                unlink($this->tempPath);
            }

            // Broadcast completion
            broadcast(new MediaUploadProgress(
                uploadId: $this->uploadId,
                fileName: $this->originalName,
                progress: 100,
                isComplete: true,
                media: $media,
                userId: $this->userId
            ));

        } catch (\Exception $e) {
            // Broadcast failure
            broadcast(new MediaUploadProgress(
                uploadId: $this->uploadId,
                fileName: $this->originalName,
                progress: 0,
                isComplete: false,
                media: null,
                userId: $this->userId,
                error: $e->getMessage()
            ));

            throw $e;
        }
    }
}
