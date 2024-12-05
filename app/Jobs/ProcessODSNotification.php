<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;


class ProcessODSNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private array $data)
    {
    }

    public function handle()
    {
        // Log dulu untuk debugging
        Log::info('Received message from ODS:', $this->data);
        
        // Proses pesan sesuai kebutuhan
        // Contoh: simpan ke database, trigger event, dll
    }
}
