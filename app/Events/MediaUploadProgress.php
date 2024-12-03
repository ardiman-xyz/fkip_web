<?php

namespace App\Events;

use App\Models\Media;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MediaUploadProgress implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public string $uploadId,
        public string $fileName,
        public int $progress,
        public bool $isComplete,
        public ?Media $media,
        public int $userId,
        public ?string $error = null
    ) {}

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('App.User.' . $this->userId)
        ];
    }

    public function broadcastAs(): string
    {
        return 'media.upload';
    }
}
