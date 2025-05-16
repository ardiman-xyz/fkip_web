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
        Schema::create('student_organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('logo_id')->nullable();
            $table->foreign('logo_id', 'org_logo_id_foreign')
                  ->references('id')
                  ->on('media')
                  ->nullOnDelete();
            $table->unsignedBigInteger('cover_image_id')->nullable();
            $table->foreign('cover_image_id', 'org_cover_id_foreign')
                  ->references('id')
                  ->on('media')
                  ->nullOnDelete();
            $table->string('founding_year')->nullable();
            $table->string('email')->nullable();
            $table->string('instagram')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Tabel untuk menyimpan kepengurusan organisasi
        Schema::create('student_organization_officers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_organization_id');
            $table->foreign('student_organization_id', 'org_officer_org_id_foreign')
                  ->references('id')
                  ->on('student_organizations')
                  ->onDelete('cascade');
            $table->string('name');
            $table->string('position');
            $table->unsignedBigInteger('image_id')->nullable();
            $table->foreign('image_id', 'org_officer_image_id_foreign')
                  ->references('id')
                  ->on('media')
                  ->nullOnDelete();
            $table->string('period'); // Periode kepengurusan (misal: 2024-2025)
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Tabel untuk menyimpan terjemahan deskripsi organisasi
        Schema::create('student_organization_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_organization_id');
            $table->foreign('student_organization_id', 'org_trans_org_id_foreign')
                  ->references('id')
                  ->on('student_organizations')
                  ->onDelete('cascade');
            $table->foreignId('language_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('vision')->nullable();
            $table->text('mission')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_organization_translations');
        Schema::dropIfExists('student_organization_officers');
        Schema::dropIfExists('student_organizations');
    }
};