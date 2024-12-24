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
        Schema::create('leader_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('leader_id')->constrained()->cascadeOnDelete();
            $table->foreignId('language_id')->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->string('position');  
            $table->text('education_history');
            $table->text('research_interests')->nullable();
            $table->text('biography');
            $table->timestamps();
        
            $table->unique(['leader_id', 'language_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leader_translations');
    }
};
