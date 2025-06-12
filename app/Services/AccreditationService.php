<?php


namespace App\Services;

use App\Models\Accreditation;
use Illuminate\Support\Facades\DB;

class AccreditationService {

    public function getAccreditationsWithTranslations(): array
    {
       $accreditations = Accreditation::with(['translations', 'media'])
           ->orderBy('order')
           ->get();
    
       return $accreditations->map(function ($accreditation) {
           $translations = $accreditation->translations->mapWithKeys(function ($translation) {
               return [
                   $translation->language_id => [
                       'title' => $translation->title, 
                       'description' => $translation->description,
                   ],
               ];
           });
    
           return [
               'id' => $accreditation->id,
               'media' => $accreditation->media,
               'year' => $accreditation->year,
               'is_active' => $accreditation->is_active,
               'order' => $accreditation->order,
               'translations' => [
                   'id' => $translations[1] ?? ['title' => '', 'description' => ''],
                   'en' => $translations[2] ?? ['title' => '', 'description' => ''],
               ],
               'created_at' => $accreditation->created_at->toDateTimeString(),
               'updated_at' => $accreditation->updated_at->toDateTimeString(),
           ];
       })->toArray();
    }
    

    public function store(array $data): Accreditation 
    {
        try {
            DB::beginTransaction();

            $accreditation = Accreditation::create([
                'media_id' => $data['media_id'],
                'year' => $data['year'],
                'is_active' => $data['is_active'] ?? true,
                'order' => $this->getNextOrder()
            ]);

            $this->createTranslations($accreditation, $data['translations']);

            DB::commit();
            return $accreditation->load(['translations', 'media']);

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(Accreditation $accreditation, array $data): Accreditation
    {
        try {
            DB::beginTransaction();

            $accreditation->update([
                'media_id' => $data['media_id'],
                'year' => $data['year'],
                'is_active' => $data['is_active']
            ]);

            $this->updateTranslations($accreditation, $data['translations']);

            DB::commit();
            return $accreditation->load(['translations', 'media']);

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateOrder(Accreditation $accreditation, string $direction): void
    {
        try {
            DB::beginTransaction();
    
            if ($direction === 'up') {
                if ($accreditation->order <= 0) {
                    throw new \Exception('Already at top');
                }
    
                $swapWith = Accreditation::where('order', $accreditation->order - 1)->first();
                if ($swapWith) {
                    $swapWith->update(['order' => $accreditation->order]);
                    $accreditation->update(['order' => $accreditation->order - 1]);
                }
            } else {
                $maxOrder = Accreditation::max('order');
                if ($accreditation->order >= $maxOrder) {
                    throw new \Exception('Already at bottom');
                }
    
                $swapWith = Accreditation::where('order', $accreditation->order + 1)->first();
                if ($swapWith) {
                    $swapWith->update(['order' => $accreditation->order]);
                    $accreditation->update(['order' => $accreditation->order + 1]);
                }
            }
    
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete(Accreditation $accreditation): void
    {
        $accreditation->delete();
    }

    private function getNextOrder(): int
    {
        return Accreditation::max('order') + 1;
    }

    private function createTranslations(Accreditation $accreditation, array $translations): void
    {
        foreach ($translations as $langCode => $data) {
            $languageId = $langCode === 'id' ? 1 : 2; 
            $accreditation->translations()->create([
                'language_id' => $languageId,
                'title' => $data['title'],
                'description' => $data['description']
            ]);
        }
    }

    private function updateTranslations(Accreditation $accreditation, array $translations): void
    {
        foreach ($translations as $langCode => $data) {
            $languageId = $langCode === 'id' ? 1 : 2;
            $accreditation->translations()
                ->where('language_id', $languageId)
                ->update([
                    'title' => $data['title'],
                    'description' => $data['description']
                ]);
        }
    }

    
    /**
     * Get accreditations for public display (only active ones)
     */
    public function getAccreditationsForPublic(): array
    {
        $accreditations = Accreditation::with(['translations', 'media'])
            ->where('is_active', true)
            ->orderBy('order', 'desc') // Show newest first
            ->orderBy('year', 'desc')
            ->get();

        return $accreditations->map(function ($accreditation) {
            $translations = $accreditation->translations->mapWithKeys(function ($translation) {
                return [
                    $translation->language_id => [
                        'title' => $translation->title, 
                        'description' => $translation->description,
                    ],
                ];
            });

            return [
                'id' => $accreditation->id,
                'media' => $accreditation->media ? [
                    'id' => $accreditation->media->id,
                    'name' => $accreditation->media->name,
                    'path' => $accreditation->media->path,
                    'paths' => $accreditation->media->paths ?? [],
                    'url' => $accreditation->media->url ?? $accreditation->media->path,
                ] : null,
                'year' => $accreditation->year,
                'translations' => [
                    'id' => $translations[1] ?? ['title' => '', 'description' => ''],
                    'en' => $translations[2] ?? ['title' => '', 'description' => ''],
                ],
                'created_at' => $accreditation->created_at->format('d M Y'),
                'updated_at' => $accreditation->updated_at->format('d M Y'),
            ];
        })->toArray();
    }
}