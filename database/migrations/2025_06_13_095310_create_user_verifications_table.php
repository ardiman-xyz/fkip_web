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
        Schema::create('user_verifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained()
                  ->onDelete('cascade');
            $table->timestamp('last_verified_at');
            $table->timestamp('next_verification_at');
            $table->integer('verification_count')->default(0);
            $table->boolean('remember_choice')->default(false);
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->enum('verification_type', ['login', 'manual', 'forced'])->default('manual');
            $table->timestamps();

            // Indexes for performance
            $table->index('user_id');
            $table->index('next_verification_at');
            $table->index(['user_id', 'next_verification_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_verifications');
    }
};
