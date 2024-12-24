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
        Schema::create('leaders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('photo_id')->nullable()->constrained('media')->nullOnDelete();
            $table->string('nip')->nullable();
            $table->string('nidn')->nullable();
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('academic_title')->nullable();
            $table->integer('order')->default(0); 
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leaders');
    }
};
