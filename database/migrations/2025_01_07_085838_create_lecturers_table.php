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
        Schema::create('lecturers', function (Blueprint $table) {
            $table->id();
            $table->string('nip')->nullable()->unique();
            $table->string('nidn')->nullable()->unique();
            $table->string('academic_title')->nullable();
            $table->string('google_scholar_id')->nullable();
            $table->string('scopus_id')->nullable();
            $table->string('sinta_id')->nullable();
            $table->enum('status', ['active', 'inactive', 'study', 'retired'])->default('active');
            
            $table->integer('study_program_id')->nullable();
            $table->foreignId('academic_position_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('media_id')->nullable()->constrained()->nullOnDelete();
            
            $table->timestamps();
            $table->softDeletes();
        });


        Schema::create('lecturer_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained()->onDelete('cascade');
            $table->string('locale')->index();
            
            $table->string('full_name');
            $table->string('place_of_birth')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->text('bio')->nullable();
            $table->text('education_history')->nullable();
            $table->text('research_interests')->nullable();
            $table->text('teaching_experience')->nullable();
            $table->text('publications')->nullable();
            $table->text('awards')->nullable();
    
        });
    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecturers');
        Schema::dropIfExists('lecturer_translations');
    }
};
