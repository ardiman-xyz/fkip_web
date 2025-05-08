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
        Schema::table('lecturer_translations', function (Blueprint $table) {
            $table->string('first_title')->nullable()->after('full_name');
            $table->string('last_title')->nullable()->after('first_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lecturer_translations', function (Blueprint $table) {
            $table->dropColumn('first_title');
            $table->dropColumn('last_title');
        });
    }
};
