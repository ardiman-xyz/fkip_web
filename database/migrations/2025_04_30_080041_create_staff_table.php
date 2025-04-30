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
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->string('nip')->nullable();
            $table->string('unit')->nullable(); // Bagian Tata Usaha, Bagian Akademik, etc.
            $table->foreignId('media_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('staff_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staff_id')->constrained()->onDelete('cascade');
            $table->string('locale')->index();
            $table->string('full_name');
            $table->string('position')->nullable(); // Kepala Bagian Tata Usaha, Staf Akademik, etc.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_translations');
        Schema::dropIfExists('staff');
    }
};
