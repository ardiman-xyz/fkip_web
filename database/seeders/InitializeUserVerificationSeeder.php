<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InitializeUserVerificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::whereNull('last_verified_at')->chunk(100, function ($users) {
            foreach ($users as $user) {
                $now = Carbon::now();
                
                $user->update([
                    'last_verified_at' => $user->created_at ?? $now,
                    'verification_required_at' => ($user->created_at ?? $now)->addDays(30),
                    'verification_count' => 0,
                ]);
            }
        });

        $this->command->info('User verification data initialized successfully.');
    }
}
