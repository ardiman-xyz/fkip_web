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
        Schema::create('study_program_descriptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('study_program_id');
            $table->text('description')->nullable();
            $table->text('vision')->nullable();
            $table->text('mission')->nullable();
            $table->text('goals')->nullable();
            $table->text('competencies')->nullable();
            $table->text('career_prospects')->nullable();
            $table->string('accreditation')->nullable();
            $table->date('accreditation_date')->nullable();
            $table->timestamps();
            
            $table->foreign('study_program_id')
                  ->references('id')
                  ->on('study_programs')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('study_program_descriptions');
    }
};
