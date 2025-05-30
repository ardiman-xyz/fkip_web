<?php

namespace App\Services;

use App\Models\About;
use App\Models\Media;
use Illuminate\Support\Facades\DB;

class AboutService
{

   public function updateVisionMission(array $data): bool
   {
       try {
           DB::beginTransaction();

           $about = About::firstOrFail();
           $about->translations()
               ->where('language_id', 1)
               ->update([
                   'vision' => $data['id']['vision'],
                   'mission' => $data['id']['mission']
               ]);

           if (isset($data['en'])) {
               $about->translations()
                   ->where('language_id', 2)
                   ->update([
                       'vision' => $data['en']['vision'],
                       'mission' => $data['en']['mission']
                   ]);
           }

           DB::commit();
           return true;

       } catch (\Exception $e) {
           DB::rollBack();
           throw $e;
       }
   }

   public function getVisiMisi()
   {
        $about = About::with(['translations'])->firstOrFail();
           
        return [
            'id' => [
                'vision' => $about->translations
                    ->where('language_id', 1)
                    ->first()
                    ?->vision ?? '',
                'mission' => $about->translations
                    ->where('language_id', 1)
                    ->first()
                    ?->mission ?? ''
            ],
            'en' => [
                'vision' => $about->translations
                    ->where('language_id', 2)
                    ->first()
                    ?->vision ?? '',
                'mission' => $about->translations
                    ->where('language_id', 2)
                    ->first()
                    ?->mission ?? ''
            ]
        ];
   }


   public function updateStructure(int $mediaId): bool
   {
       try {
           $about = About::firstOrFail();
           
           return $about->update([
               'organization_structure_id' => $mediaId
           ]);
       } catch (\Exception $e) {
           throw $e;
       }
   }

   public function getStructure(): ?Media
   {
       return About::firstOrFail()->organizationStructure;
   }


   public function getVisionMissionFirst()
    {
    $about = About::with(['translations'])->first();

        if (!$about) return null;

        $translations = [];
        foreach ($about->translations as $translation) {
            $translations[$translation->language_id == 1 ? 'id' : 'en'] = [
                'language_id' => $translation->language_id,
                'title' => 'Visi & Misi',  // Static title
                'vision' => $translation->vision,
                'mission' => $translation->mission,
            ];
        }

        return [
            'id' => $about->id,
            'translations' => $translations,
            'created_at' => $about->created_at,
            'updated_at' => $about->updated_at
        ];
    }

 
}
