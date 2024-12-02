<?php

namespace App\Services;

use App\Models\Event;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EventService
{
   public function create(array $data)
   {
       try {
           DB::beginTransaction();

           // Create event
           $event = Event::create([
               'media_id' => $data['featured_image'] ?? null,
               'category_id' => $data['category_id'],
               'status' => $data['status'],
               'is_featured' => $data['is_featured'],
               'type' => $data['type'],
               'start_date' => $data['start_date'],
               'end_date' => $data['end_date'],
               'location' => $data['location'] ?? null,
               'platform' => $data['platform'] ?? null,
               'meeting_url' => $data['meeting_url'] ?? null,
               'registration_url' => $data['registration_url'] ?? null,
               'quota' => $data['quota'] ?? null,
               'is_free' => $data['is_free'],
               'price' => $data['is_free'] ? null : $data['price'],
           ]);

           foreach (['id', 'en'] as $lang) {
               if (!empty($data[$lang]['title'])) {
                   $event->translations()->create([
                       'language_id' => $lang === 'id' ? 1 : 2,
                       'title' => $data[$lang]['title'],
                       'content' => $data[$lang]['content'],
                       'slug' => Str::slug($data[$lang]['title'])
                   ]);
               }
           }

           // Attach tags
           if (!empty($data['tags'])) {
               $event->tags()->attach($data['tags']);
           }

           DB::commit();
           return $event->load('translations.language', 'media', 'category', 'tags');

       } catch (\Exception $e) {
           DB::rollBack();
           throw $e;
       }
   }
}