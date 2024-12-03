<?php

namespace App\Events;

use App\Models\Media;
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

    public function handle(): void
    {
        try {
            // Generate unique filename
            $randomFileName = Str::uuid() . '_' . time() . '.' . pathinfo($this->originalName, PATHINFO_EXTENSION);
            
            // Generate random subdirectory
            $randomSubdirectory = 'media/' . date('Y') . '/' . date('m') . '/' . Str::random(10);
            
            // Broadcast start
            broadcast(new MediaUploadProgress(
                uploadId: $this->uploadId,
                fileName: $this->originalName,
                progress: 0,
                isComplete: false,
                media: null,
                userId: $this->userId
            ));
            
            // Store file di public disk
            $path = Storage::disk('public')->putFileAs(
                $randomSubdirectory, 
                new File($this->tempPath), 
                $randomFileName
            );

            // Create media record
            $media = Media::create([
                'name' => pathinfo($this->originalName, PATHINFO_FILENAME),
                'file_name' => $randomFileName,
                'mime_type' => $this->mimeType,
                'path' => $path,
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
