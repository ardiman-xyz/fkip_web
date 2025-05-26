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
        Schema::create('announcement_tags', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('announcement_id');
            $table->unsignedBigInteger('tag_id');
            
            $table->timestamps();
            
            // Foreign keys dengan nama pendek
            $table->foreign('announcement_id', 'fk_ann_tag_ann_id')
                  ->references('id')->on('announcements')->onDelete('cascade');
            $table->foreign('tag_id', 'fk_ann_tag_tag_id')
                  ->references('id')->on('tags')->onDelete('cascade');
            
            $table->unique(['announcement_id', 'tag_id'], 'unique_ann_tag');
            $table->index(['announcement_id'], 'idx_ann_id');
            $table->index(['tag_id'], 'idx_tag_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcement_tags');
    }
};
