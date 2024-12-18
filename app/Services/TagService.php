<?php

namespace App\Services;

use App\Models\Language;
use App\Models\Tag;
use Illuminate\Support\Facades\DB;

class TagService
{

    public function getAllWithTranslations()
    {
        return Tag::with(['translations.language'])->orderBy("id", "desc")->get()
            ->map(function ($tag) {
                $translations = $tag->translations->groupBy('language.code')
                    ->map(function ($items) {
                        return $items->first();
                    });

                return [
                    'id' => $tag->id,
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
        return Tag::with(['translations' => function($query) {
            $query->whereHas('language', fn($q) => $q->where('code', 'id'));
        }])
        ->get()
        ->map(function($tag) {
            return [
                'value' => (string) $tag->id,
                'label' => $tag->translations->first()?->name ?? 'Untitled'
            ];
        });
    }


    public function create(array $data)
    {


        try {
            DB::beginTransaction();

            $tag = Tag::create();

            $languages = Language::whereIn('code', ['id', 'en'])->get();

            foreach ($languages as $language) {
                $languageCode = $language->code;
                
                if (empty($data[$languageCode]['name'])) {
                    continue;
                }

                $tag->translations()->create([
                    'language_id' => $language->id,
                    'name' => $data[$languageCode]['name'],
                ]);
            }

            DB::commit();
            return $tag->load('translations.language');

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    
    public function update(Tag $tag, array $data)
    {
        try {
            DB::beginTransaction();

            foreach (['id', 'en'] as $langCode) {
                if (!empty($data[$langCode]['name'])) {
                    $language = Language::where('code', $langCode)->first();
                    
                    $translation = $tag->translations()
                        ->whereHas('language', fn($q) => $q->where('code', $langCode))
                        ->first();

                    if ($translation) {
                        $translation->update([
                            'name' => $data[$langCode]['name'],
                        ]);
                    } else {
                        $tag->translations()->create([
                            'language_id' => $language->id,
                            'name' => $data[$langCode]['name'],
                        ]);
                    }
                }
            }

            DB::commit();
            return $tag->load('translations.language');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete(Tag $tag)
    {
        return DB::transaction(function () use ($tag) {
            $tag->translations()->delete();
            return $tag->delete();
        });
    }

}