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
        Schema::table('users', function (Blueprint $table) {
            $table->index('last_verified_at');
            $table->index('verification_required_at');
            $table->index(['id', 'verification_required_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['last_verified_at']);
            $table->dropIndex(['verification_required_at']);
            $table->dropIndex(['id', 'verification_required_at']);
        });
    }
};
