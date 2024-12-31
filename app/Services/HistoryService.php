<?php

namespace App\Services;

use App\Models\History;
use Illuminate\Support\Facades\DB;

class HistoryService
{

    public function getFirst()
    {
        $history = History::with(['translations'])->first();

        if (!$history) return null;

        $translations = [];
        foreach ($history->translations as $translation) {
            $translations[$translation->language_id == 1 ? 'id' : 'en'] = [
                'language_id' => $translation->language_id,
                'title' => $translation->title,
                'content' => $translation->content,
            ];
        }

        return [
            'id' => $history->id,
            'is_active' => $history->is_active,
            'translations' => $translations
        ];
    }


   public function create(array $data)
   {
       DB::beginTransaction();
       try {
           $history = History::create([
               'is_active' => $data['is_active']
           ]);

           // Save ID translation
           $history->translations()->create([
               'language_id' => $data['translations']['id']['language_id'],
               'title' => $data['translations']['id']['title'],
               'content' => $data['translations']['id']['content'],
           ]);

           // Save EN translation
           $history->translations()->create([
               'language_id' => $data['translations']['en']['language_id'],
               'title' => $data['translations']['en']['title'],
               'content' => $data['translations']['en']['content'],
           ]);

           DB::commit();

           return $history->load(['translations']);
       } catch (\Exception $e) {
           DB::rollBack();
           throw $e;
       }
   }

   public function update(History $history, array $data)
   {
       DB::beginTransaction();
       try {
           $history->update([
               'is_active' => $data['is_active']
           ]);

           // Update ID translation
           $history->translations()
               ->where('language_id', $data['translations']['id']['language_id'])
               ->update([
                   'title' => $data['translations']['id']['title'],
                   'content' => $data['translations']['id']['content'],
               ]);

           // Update EN translation
           $history->translations()
               ->where('language_id', $data['translations']['en']['language_id'])
               ->update([
                   'title' => $data['translations']['en']['title'],
                   'content' => $data['translations']['en']['content'],
               ]);

           DB::commit();

           return $history->load(['translations']);
       } catch (\Exception $e) {
           DB::rollBack();
           throw $e;
       }
   }
}
