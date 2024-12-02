<?php

namespace App\Services;

use App\Models\Language;
use App\Models\News;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class NewsService
{

    public function getAllWithTranslations()
    {
        return News::with(['translations.language', 'media', 'category', 'tags'])->orderBy("id", "desc")->get()
            ->map(function ($news) {
               
               
                $newsTranslations = $news->translations->groupBy('language.code')
                    ->map(function ($items) {
                        return $items->first();
                    });

                $categoryTranslations = $news->category->translations->groupBy('language.code')
                    ->map(function ($items) {
                        return $items->first();
                    });

                return [
                    'id' => $news->id,
                    'translations' => [
                        'id' => [
                            'title' => $newsTranslations->get('id')?->title ?? null,
                            'slug' => $newsTranslations->get('id')?->slug ?? null,
                            'content' => $newsTranslations->get('id')?->content ?? null,
                        ],
                        'en' => [
                            'title' => $newsTranslations->get('en')?->title ?? null,
                            'slug' => $newsTranslations->get('en')?->slug ?? null,
                            'content' => $newsTranslations->get('en')?->content ?? null,
                        ],
                    ],
                    'category' => [
                        'id' => $news->category->id ?? null,
                        'translations' => [
                            'id' => [
                                'name' => $categoryTranslations->get('id')?->name ?? null,
                            ],
                            'en' => [
                                'name' => $categoryTranslations->get('en')?->name ?? null,
                            ],
                        ],
                    ],
                    'media' => $news->media,
                    'tags' => $news->tags,
                    'status' => $news->status,
                    'is_featured' => $news->is_featured,
                    'publish_date' => $news->publish_date,
                    'created_at' => $news->created_at,
                    'updated_at' => $news->updated_at,
                ];
            });
    }

    public function getWithTranslationsByNews(News $news)
    {
        $news = $news->load(['translations.language', 'media', 'category.translations.language', 'tags']);

        $newsTranslations = $news->translations->groupBy('language.code')
            ->map(function ($items) {
                return $items->first();
            });

        $categoryTranslations = $news->category->translations->groupBy('language.code')
            ->map(function ($items) {
                return $items->first();
            });

        return [
            'id' => $news->id,
            'translations' => [
                'id' => [
                    'title' => $newsTranslations->get('id')?->title ?? null,
                    'slug' => $newsTranslations->get('id')?->slug ?? null,
                    'content' => $newsTranslations->get('id')?->content ?? null,
                ],
                'en' => [
                    'title' => $newsTranslations->get('en')?->title ?? null,
                    'slug' => $newsTranslations->get('en')?->slug ?? null,
                    'content' => $newsTranslations->get('en')?->content ?? null,
                ],
            ],
            'category' => [
                'id' => $news->category->id ?? null,
                'translations' => [
                    'id' => [
                        'name' => $categoryTranslations->get('id')?->name ?? null,
                    ],
                    'en' => [
                        'name' => $categoryTranslations->get('en')?->name ?? null,
                    ],
                ],
            ],
            'media' => $news->media,
            'tags' => $news->tags->map(function($tag) {
                return [
                    'value' => (string) $tag->id,
                    'label' => $tag->translations->where('language.code', 'id')->first()?->name ?? 'Untitled'
                ];
            })->toArray(),
            'status' => $news->status,
            'is_featured' => $news->is_featured,
            'publish_date' => $news->publish_date->format('Y-m-d'),
            'created_at' => $news->created_at,
            'updated_at' => $news->updated_at,
        ];
    }

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


    public function update(News $news, array $data)
    {
        try {
            DB::beginTransaction();

            $news->update([
                'media_id' => $data['featured_image'] ?? null,
                'category_id' => $data['category_id'],
                'is_featured' => $data['is_featured'],
                'status' => $data['status'],
                'publish_date' => $data['publish_date']
            ]);

            foreach (['id', 'en'] as $langCode) {
                if (!empty($data[$langCode]['title'])) {
                    $translation = $news->translations()
                        ->whereHas('language', fn($q) => $q->where('code', $langCode))
                        ->first();

                    if ($translation) {
                        $translation->update([
                            'title' => $data[$langCode]['title'],
                            'content' => $data[$langCode]['content'],
                            'slug' => Str::slug($data[$langCode]['title'])
                        ]);
                    }
                }
            }

            // Sync tags
            if (isset($data['tags'])) {
                $news->tags()->sync($data['tags']);
            }

            DB::commit();
            return $news->load('translations.language', 'media', 'category', 'tags');

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }


    public function delete(News $news)
    {
    try {
        DB::beginTransaction();

        $news->translations()->delete();
        
        $news->tags()->detach();
        
        $news->delete();

        DB::commit();
        return true;

    } catch (\Exception $e) {
        DB::rollBack();
        throw $e;
    }
    }
}