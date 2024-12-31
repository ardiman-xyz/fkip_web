<?php

namespace App\Services;

use App\Models\Leader;
use Illuminate\Support\Facades\DB;

class LeaderService {
   
    // app/Services/LeaderService.php
public function getAll() 
{
    $leaders = Leader::with(['media', 'translations'])
        ->orderBy('order', 'desc') 
        ->get();

        return $leaders->map(function ($leader) {
            $translations = [];
            foreach ($leader->translations as $translation) {
                $translations[$translation->language_id == 1 ? 'id' : 'en'] = [
                    'language_id' => $translation->language_id,
                    'full_name' => $translation->full_name,
                    'position' => $translation->position,
                    'education_history' => $translation->education_history,
                    'research_interests' => $translation->research_interests,
                    'biography' => $translation->biography
                ];
            }

            return [
                'id' => $leader->id,
                'media_id' => $leader->photo_id,
                'nip' => $leader->nip,
                'nidn' => $leader->nidn,
                'email' => $leader->email,
                'phone' => $leader->phone,
                'academic_title' => $leader->academic_title,
                'order' => $leader->order,
                'is_active' => $leader->is_active,
                'created_at' => $leader->created_at,
                'updated_at' => $leader->updated_at,
                'media' => $leader->media ? [
                    'id' => $leader->media->id,
                    'path' => $leader->media->paths['original'] ?? $leader->media->path
                ] : null,
                'translations' => $translations
            ];
        });
    }

    public function create(array $data) 
    {
        DB::beginTransaction();
        try {
            $leader = Leader::create([
                'photo_id' => $data['media_id'],
                'nip' => $data['nip'],
                'nidn' => $data['nidn'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'academic_title' => $data['academic_title'],
                'order' => Leader::max('order') + 1
            ]);

            // Simpan translations
            $leader->translations()->create([
                'language_id' => 1,
                'full_name' => $data['translations']['id']['full_name'],
                'position' => $data['translations']['id']['position'],
                'education_history' => $data['translations']['id']['education_history'],
                'research_interests' => $data['translations']['id']['research_interests'],
                'biography' => $data['translations']['id']['biography']
            ]);

            $leader->translations()->create([
                'language_id' => 2,
                'full_name' => $data['translations']['en']['full_name'],
                'position' => $data['translations']['en']['position'],
                'education_history' => $data['translations']['en']['education_history'],
                'research_interests' => $data['translations']['en']['research_interests'],
                'biography' => $data['translations']['en']['biography']
            ]);

            $leader->load(['media', 'translations']);

            // Transform data sesuai format frontend
            $transformedData = [
                'id' => $leader->id,
                'photo_id' => $leader->photo_id,
                'nip' => $leader->nip,
                'nidn' => $leader->nidn,
                'email' => $leader->email,
                'phone' => $leader->phone,
                'academic_title' => $leader->academic_title,
                'order' => $leader->order,
                'is_active' => $leader->is_active,
                'created_at' => $leader->created_at,
                'updated_at' => $leader->updated_at,
                'media' => $leader->media ? [
                    'id' => $leader->media->id,
                    'path' => $leader->media->paths['original'] ?? $leader->media->path
                ] : null,
                'translations' => [
                    'id' => $leader->translations->where('language_id', 1)->first()->only([
                        'language_id',
                        'full_name',
                        'position',
                        'education_history',
                        'research_interests',
                        'biography'
                    ]),
                    'en' => $leader->translations->where('language_id', 2)->first()->only([
                        'language_id',
                        'full_name',
                        'position',
                        'education_history',
                        'research_interests',
                        'biography'
                    ])
                ]
            ];

            DB::commit();
            return $transformedData;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(Leader $leader, array $data)
   {
       DB::beginTransaction();
       try {
           $leader->update([
               'photo_id' => $data['media_id'],
               'nip' => $data['nip'],
               'nidn' => $data['nidn'],
               'email' => $data['email'],
               'phone' => $data['phone'],
               'academic_title' => $data['academic_title']
           ]);

           $leader->translations()
               ->where('language_id', 1)
               ->update([
                   'full_name' => $data['translations']['id']['full_name'],
                   'position' => $data['translations']['id']['position'],
                   'education_history' => $data['translations']['id']['education_history'],
                   'research_interests' => $data['translations']['id']['research_interests'],
                   'biography' => $data['translations']['id']['biography']
               ]);

           $leader->translations()
               ->where('language_id', 2)
               ->update([
                   'full_name' => $data['translations']['en']['full_name'],
                   'position' => $data['translations']['en']['position'],
                   'education_history' => $data['translations']['en']['education_history'],
                   'research_interests' => $data['translations']['en']['research_interests'],
                   'biography' => $data['translations']['en']['biography']
               ]);

               $leader->load(['media', 'translations']);

               // Transform data untuk frontend
               $transformedData = [
                    'id' => $leader->id,
                    'photo_id' => $leader->photo_id,
                    'nip' => $leader->nip,
                    'nidn' => $leader->nidn,
                    'email' => $leader->email,
                    'phone' => $leader->phone,
                    'academic_title' => $leader->academic_title,
                    'order' => $leader->order,
                    'is_active' => $leader->is_active,
                    'created_at' => $leader->created_at,
                    'updated_at' => $leader->updated_at,
                    'media' => $leader->media ? [
                        'id' => $leader->media->id,
                        'path' => $leader->media->paths['original'] ?? $leader->media->path
                    ] : null,
                   'translations' => [
                       'id' => $leader->translations->where('language_id', 1)->first()->only([
                           'language_id',
                           'full_name',
                           'position',
                           'education_history',
                           'research_interests',
                           'biography'
                       ]),
                       'en' => $leader->translations->where('language_id', 2)->first()->only([
                           'language_id',
                           'full_name',
                           'position',
                           'education_history',
                           'research_interests',
                           'biography'
                       ])
                   ]
               ];
       
               DB::commit();
            return $transformedData;
       } catch (\Exception $e) {
           DB::rollBack();
           throw $e;
       }
   }


   public function delete(Leader $leader)
    {
    DB::beginTransaction();
    try {
        $deletedOrder = $leader->order;

        $leader->delete();

        Leader::where('order', '>', $deletedOrder)
            ->decrement('order');

        DB::commit();
        return true;
    } catch (\Exception $e) {
        DB::rollBack();
        throw $e;
    }
    }

}