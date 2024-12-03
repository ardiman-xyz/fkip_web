<?php

namespace App\Services;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EventService
{


    public function getAllWithTranslations()
    {
        return Event::with(['translations.language', 'media', 'category', 'tags'])->orderBy("id", "desc")->get()
            ->map(function ($event) {
               
               
                $eventTranslations = $event->translations->groupBy('language.code')
                    ->map(function ($items) {
                        return $items->first();
                    });

                $categoryTranslations = $event->category->translations->groupBy('language.code')
                    ->map(function ($items) {
                        return $items->first();
                    });

                $eventStatus = $this->getEventStatus($event->start_date, $event->end_date);

                return [
                    'id' => $event->id,
                    'translations' => [
                        'id' => [
                            'title' => $eventTranslations->get('id')?->title ?? null,
                            'slug' => $eventTranslations->get('id')?->slug ?? null,
                            'content' => $eventTranslations->get('id')?->content ?? null,
                        ],
                        'en' => [
                            'title' => $eventTranslations->get('en')?->title ?? null,
                            'slug' => $eventTranslations->get('en')?->slug ?? null,
                            'content' => $eventTranslations->get('en')?->content ?? null,
                        ],
                    ],
                    'category' => [
                        'id' => $event->category->id ?? null,
                        'translations' => [
                            'id' => [
                                'name' => $categoryTranslations->get('id')?->name ?? null,
                            ],
                            'en' => [
                                'name' => $categoryTranslations->get('en')?->name ?? null,
                            ],
                        ],
                    ],
                    'formatted_date' => $this->formatEventDateTime($event->start_date, $event->end_date),
                    'event_status' => $eventStatus,
                    'media' => $event->media,
                    'tags' => $event->tags,
                    'status' => $event->status,
                    'is_featured' => $event->is_featured,
                    'start_date' => $event->start_date,
                    'end_date' => $event->end_date,
                    'location' => $event->location,
                    'type' => $event->type,
                    'platform' => $event->platform,
                    'meeting_url' => $event->meeting_url,
                    'registration_url' => $event->registration_url,
                    'quota' => $event->quota,
                    'is_free' => $event->is_free,
                    'price' => $event->price,
                    'created_at' => $event->created_at,
                ];
            });
    }

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


    public function formatEventDateTime($startDate, $endDate)
    {
        $start = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);
        
        if ($start->format('Y-m-d') === $end->format('Y-m-d')) {
            return $start->format('d F Y, H:i') . ' - ' . $end->format('H:i');
        } 
        else if ($start->format('Y-m') === $end->format('Y-m')) {
            return $start->format('d') . ' - ' . $end->format('d F Y') . ' (' . $start->format('H:i') . ' - ' . $end->format('H:i') . ')';
        }
        else if ($start->format('Y') === $end->format('Y')) {
            return $start->format('d F') . ' (' . $start->format('H:i') . ') - ' . $end->format('d F Y') . ' (' . $end->format('H:i') . ')';
        }
        else {
            return $start->format('d F Y') . ' (' . $start->format('H:i') . ') - ' . $end->format('d F Y') . ' (' . $end->format('H:i') . ')';
        }
    }

    public function getEventStatus($startDate, $endDate)
    {
        $now = Carbon::now();
        $start = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);
        
        if ($now < $start) {
            return 'upcoming';
        } else if ($now >= $start && $now <= $end) {
            return 'ongoing';
        } else {
            return 'completed';
        }
    }


}