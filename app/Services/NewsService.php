<?php

namespace App\Services;

use App\Models\Language;
use App\Models\News;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class NewsService
{
    public function create(array $data)
    {
        $languages = Language::whereIn('code', ['id', 'en'])->get();

        try {
            DB::beginTransaction();

            $news = News::create([
                'media_id' => $data['featured_image'] ?? null,
                'category_id' => $data['category_id'],
                'is_featured' => $data['is_featured'],
                'status' => $data['status'],
                'publish_date' => $data['publish_date']
            ]);

            foreach ($languages as $language) {
                $langCode = $language->code;
                
                if (!empty($data[$langCode]['title'])) {
                    $news->translations()->create([
                        'language_id' => $language->id,
                        'title' => $data[$langCode]['title'],
                        'content' => $data[$langCode]['content'],
                        'slug' => Str::slug($data[$langCode]['title'])
                    ]);
                }
            }

            if (!empty($data['tags'])) {
                $news->tags()->attach($data['tags']);
            }

            DB::commit();
            return $news->load('translations.language', 'media', 'category', 'tags');

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}