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
        Schema::create('study_program_lecturers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('study_program_id');
            $table->unsignedBigInteger('lecturer_id');
            $table->string('role')->nullable(); // Kepala Prodi, Sekretaris, Dosen, dll
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->foreign('study_program_id')
                  ->references('id')
                  ->on('study_programs')
                  ->onDelete('cascade');
                  
            $table->foreign('lecturer_id')
                  ->references('id')
                  ->on('lecturers')
                  ->onDelete('cascade');
            
            $table->unique(['study_program_id', 'lecturer_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('study_program_lecturers');
    }
};
