<?php

namespace Database\Seeders;

use App\Models\Languange;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            [
                'code' => 'id',
                'name' => 'Indonesia',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'en',
                'name' => 'English',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        Languange::insert($languages);
    }
}
