<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_verification_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained()
                  ->onDelete('cascade');
            $table->enum('action', [
                'verification_required',
                'verification_success', 
                'verification_failed',
                'verification_declined',
                'verification_bypassed'
            ]);
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->boolean('remember_choice')->default(false);
            $table->json('metadata')->nullable(); // Additional data
            $table->string('session_id')->nullable();
            $table->timestamp('verified_until')->nullable();
            $table->timestamps();

            // Indexes for performance and querying
            $table->index('user_id');
            $table->index('action');
            $table->index('created_at');
            $table->index(['user_id', 'action']);
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_verification_logs');
    }
};
