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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->string('status')->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->enum('type', ['online', 'offline', 'hybrid']); 
            $table->string('location')->nullable();
            $table->string('platform')->nullable(); 
            $table->string('meeting_url')->nullable();
            $table->string('registration_url')->nullable(); 
            $table->integer('quota')->nullable(); 
            $table->boolean('is_free')->default(true); 
            $table->decimal('price', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
