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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('media_id')->nullable();
            $table->unsignedBigInteger('user_id'); // Author
            
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->enum('priority', ['low', 'normal', 'high', 'urgent'])->default('normal');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_pinned')->default(false);
            $table->datetime('published_at')->nullable();
            $table->integer('view_count')->default(0);
            $table->json('action')->nullable();
            $table->timestamps();
            
            $table->foreign('media_id', 'fk_ann_media_id')
                  ->references('id')->on('media')->onDelete('set null');
            $table->foreign('user_id', 'fk_ann_user_id')
                  ->references('id')->on('users')->onDelete('cascade');
            
            $table->index(['status'], 'idx_status');
            $table->index(['priority'], 'idx_priority');
            $table->index(['is_featured'], 'idx_featured');
            $table->index(['is_pinned'], 'idx_pinned');
            $table->index(['published_at'], 'idx_published');
            $table->index(['expires_at'], 'idx_expires');
            $table->index(['user_id'], 'idx_user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
