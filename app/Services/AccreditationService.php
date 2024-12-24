<?php


namespace App\Services;

use App\Models\Accreditation;
use Illuminate\Support\Facades\DB;

class AccreditationService {

    public function getAccreditationsWithTranslations(): array
    {
        $accreditations = Accreditation::with(['translations', 'media'])->get();
    
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
        $currentOrder = $accreditation->order;
        $operator = $direction === 'up' ? '<' : '>';
        $orderDirection = $direction === 'up' ? 'desc' : 'asc';

        $swapWith = Accreditation::where('order', $operator, $currentOrder)
            ->orderBy('order', $orderDirection)
            ->first();

        if ($swapWith) {
            DB::transaction(function () use ($accreditation, $swapWith) {
                $tempOrder = $accreditation->order;
                $accreditation->update(['order' => $swapWith->order]);
                $swapWith->update(['order' => $tempOrder]);
            });
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
}