<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class UserLoginLog implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected array $logData
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $logMessage = "✅ User Login Success\n```\n";

        foreach ($this->logData as $key => $value) {
            $logMessage .= "{$key}: {$value}\n";
        }

        $logMessage .= "```";

        Log::info($logMessage);
    }
}
