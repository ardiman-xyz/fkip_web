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
            $table->timestamp('last_verified_at')->nullable()->after('email_verified_at');
            $table->timestamp('verification_required_at')->nullable()->after('last_verified_at');
            $table->integer('verification_count')->default(0)->after('verification_required_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'last_verified_at',
                'verification_required_at', 
                'verification_count'
            ]);
        });
    }
};
