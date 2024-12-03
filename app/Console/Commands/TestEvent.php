<?php

namespace App\Console\Commands;

use App\Events\MediaUploadProgress;
use Illuminate\Console\Command;

class TestEvent extends Command
{
    protected $signature = 'broadcast:test';
    protected $description = 'Test broadcasting event';

    public function handle()
    {
        $userId = 1; // Sesuaikan dengan user ID yang ada
        
        broadcast(new MediaUploadProgress(
            uploadId: 'test-123',
            fileName: 'test.jpg',
            progress: 50,
            isComplete: false,
            media: null,
            userId: $userId
        ));

        $this->info('Broadcast event sent!');
    }
}
