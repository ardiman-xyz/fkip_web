<?php

namespace App\Console\Commands;

use App\Events\ODSNotificationReceived;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use PhpAmqpLib\Connection\AMQPStreamConnection;

class ConsumeODSNotification extends Command
{
    protected $signature = 'rabbitmq:consume';
    protected $description = 'Consume messages from ODS';

    public function handle()
    {
        $connection = new AMQPStreamConnection(
            '172.27.0.2',
            5672,
            'admin',
            'admin123'
        );

        $channel = $connection->channel();
        $channel->queue_declare('fkip.notifications', false, true, false, false);

        $this->info("[*] Waiting for messages from ODS. To exit press CTRL+C");

        $callback = function ($msg) {
            $data = json_decode($msg->body, true);
            
            Log::info('Received message from ODS:', $data);
            
            broadcast(new ODSNotificationReceived($data));
            
            $msg->ack();
        };

        $channel->basic_consume('fkip.notifications', '', false, false, false, false, $callback);

        while ($channel->is_consuming()) {
            $channel->wait();
        }
    }
}
