<?php

namespace Database\Seeders;

use App\Models\AnnouncementCategory;
use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnnouncementCategorySeeder extends Seeder
{
    public function run(): void
    {
        $indonesian = Language::where('code', 'id')->first();
        $english = Language::where('code', 'en')->first();

        $categories = [
            [
                'slug' => 'info',
                'icon' => 'PiInfoDuotone',
                'color' => '#2563EB',
                'bg_color' => '#DBEAFE',
                'order_index' => 1,
                'translations' => [
                    'id' => ['name' => 'Informasi', 'description' => 'Informasi umum dan pemberitahuan'],
                    'en' => ['name' => 'Information', 'description' => 'General information and notifications']
                ]
            ],
            [
                'slug' => 'urgent',
                'icon' => 'PiWarningDuotone',
                'color' => '#DC2626',
                'bg_color' => '#FEE2E2',
                'order_index' => 2,
                'translations' => [
                    'id' => ['name' => 'Penting', 'description' => 'Pengumuman penting dan mendesak'],
                    'en' => ['name' => 'Urgent', 'description' => 'Important and urgent announcements']
                ]
            ],
            [
                'slug' => 'event',
                'icon' => 'PiCalendarDuotone',
                'color' => '#059669',
                'bg_color' => '#D1FAE5',
                'order_index' => 3,
                'translations' => [
                    'id' => ['name' => 'Acara', 'description' => 'Event dan kegiatan kampus'],
                    'en' => ['name' => 'Event', 'description' => 'Campus events and activities']
                ]
            ],
            [
                'slug' => 'document',
                'icon' => 'PiDownloadDuotone',
                'color' => '#7C3AED',
                'bg_color' => '#EDE9FE',
                'order_index' => 4,
                'translations' => [
                    'id' => ['name' => 'Dokumen', 'description' => 'Dokumen dan file download'],
                    'en' => ['name' => 'Document', 'description' => 'Documents and downloadable files']
                ]
            ],
            [
                'slug' => 'gallery',
                'icon' => 'PiImageDuotone',
                'color' => '#EA580C',
                'bg_color' => '#FED7AA',
                'order_index' => 5,
                'translations' => [
                    'id' => ['name' => 'Galeri', 'description' => 'Foto dan galeri kegiatan'],
                    'en' => ['name' => 'Gallery', 'description' => 'Photos and activity galleries']
                ]
            ]
        ];

        foreach ($categories as $categoryData) {
            $translations = $categoryData['translations'];
            unset($categoryData['translations']);

            $category = AnnouncementCategory::create($categoryData);

            // Create translations
            if ($indonesian) {
                $category->translations()->create([
                    'language_id' => $indonesian->id,
                    'name' => $translations['id']['name'],
                    'description' => $translations['id']['description']
                ]);
            }

            if ($english) {
                $category->translations()->create([
                    'language_id' => $english->id,
                    'name' => $translations['en']['name'],
                    'description' => $translations['en']['description']
                ]);
            }
        }
    }
}
