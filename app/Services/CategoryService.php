<?php

namespace App\Services;

use App\Models\Language;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryService
{

    public function getAllWithTranslations()
    {
        return Category::with(['translations.language'])->orderBy("id", "desc")->get()
            ->map(function ($category) {
                $translations = $category->translations->groupBy('language.code')
                    ->map(function ($items) {
                        return $items->first();
                    });

                return [
                    'id' => $category->id,
                    'translations' => [
                        'id' => [
                            'name' => $translations->get('id')?->name ?? '',
                        ],
                        'en' => [
                            'name' => $translations->get('en')?->name ?? '',
                        ],
                    ],
                ];
            });
    }


    public function getAllWithTranslationsLabelAndValues()
    {
        return Category::with(['translations' => function($query) {
            $query->whereHas('language', fn($q) => $q->where('code', 'id'));
        }])
        ->get()
        ->map(function($category) {
            return [
                'value' => (string) $category->id, 
                'label' => $category->translations->first()?->name ?? 'Untitled'
            ];
        });
    }


    public function create(array $data)
    {
        try {
            DB::beginTransaction();

            $category = Category::create();

            $languages = Language::whereIn('code', ['id', 'en'])->get();

            foreach ($languages as $language) {
                $languageCode = $language->code;
                
                if (empty($data[$languageCode]['name'])) {
                    continue;
                }

                $category->translations()->create([
                    'language_id' => $language->id,
                    'name' => $data[$languageCode]['name'],
                ]);
            }

            DB::commit();
            return $category->load('translations.language');

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }


    public function update(Category $category, array $data)
    {
        try {
            DB::beginTransaction();

            foreach (['id', 'en'] as $langCode) {
                if (!empty($data[$langCode]['name'])) {
                    $language = Language::where('code', $langCode)->first();
                    
                    $translation = $category->translations()
                        ->whereHas('language', fn($q) => $q->where('code', $langCode))
                        ->first();

                    if ($translation) {
                        $translation->update([
                            'name' => $data[$langCode]['name'],
                        ]);
                    } else {
                        $category->translations()->create([
                            'language_id' => $language->id,
                            'name' => $data[$langCode]['name'],
                        ]);
                    }
                }
            }

            DB::commit();
            return $category->load('translations.language');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }


    public function delete(Category $category)
    {
        return DB::transaction(function () use ($category) {
            $category->translations()->delete();
            return $category->delete();
        });
    }
}