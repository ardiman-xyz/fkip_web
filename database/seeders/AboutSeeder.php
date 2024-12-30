<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    public function run(): void
    {
        $about = About::create([
            'organization_structure_id' => null,
            'dean_image_id' => null,
        ]);

        $about->translations()->create([
            'language_id' => 1,
            'vision' => '<p>Menjadi Fakultas terkemuka...</p>',
            'mission' => '<ul><li>Menyelenggarakan pendidikan...</li></ul>',
            'dean_profile' => '<p>Dr. John Doe, M.Pd. adalah dekan...</p>'
        ]);

        $about->translations()->create([
            'language_id' => 2,
            'vision' => '<p>To become a leading Faculty...</p>',
            'mission' => '<ul><li>Organize innovative education...</li></ul>',
            'dean_profile' => '<p>Dr. John Doe, M.Pd. is the dean...</p>'
        ]);
    }
}
