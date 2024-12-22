<?php

namespace App\Services;

use App\Models\DefaultSlider;
use App\Models\Event;
use App\Models\News;
use App\Models\Language;
use App\Models\NewsTranslation;

class WelcomeService
{
    public function getLatestNews(int $limit = 3)
    {
        return News::with([
            'translations.language',
            'media',
            'category.translations.language',
            'tags.translations.language'
        ])
            ->orderBy('publish_date', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($news) {
                $translations = $news->translations->reduce(function ($acc, $translation) {
                    $langCode = $translation->language->code;
                    $acc[$langCode] = [
                        'title' => $translation->title,
                        'slug' => $translation->slug,
                        'excerpt' => $translation->excerpt,
                        'content' => $translation->content,
                    ];
                    return $acc;
                }, []);

                $categoryTranslations = $news->category?->translations->reduce(function ($acc, $translation) {
                    $langCode = $translation->language->code;
                    $acc[$langCode] = [
                        'name' => $translation->name,
                        'slug' => $translation->slug,
                    ];
                    return $acc;
                }, []);

                return [
                    'id' => $news->id,
                    'translations' => $translations,
                    'media' => $news->media ? [
                        'id' => $news->media->id,
                        'file_name' => $news->media->file_name,
                        'mime_type' => $news->media->mime_type,
                        'path' => $news->media->path,
                        'paths' => $news->media->paths,
                        'size' => $news->media->size,
                        'url' => $news->media->url,
                    ] : null,
                    'category' => $news->category ? [
                        'id' => $news->category->id,
                        'translations' => $categoryTranslations
                    ] : null,
                    'tags' => $news->tags->map(function ($tag) {
                        return [
                            'value' => (string) $tag->id,
                            'label' => $tag->translations->first()?->name ?? $tag->name
                        ];
                    })->toArray(),
                    'status' => $news->status,
                    'path' => $news->path,
                    'is_featured' => (bool) $news->is_featured,
                    'publish_date' => $news->publish_date?->format('Y-m-d'),
                    'created_at' => $news->created_at,
                    'updated_at' => $news->updated_at,
                ];
            });
    }

    public function getFeaturedNews()
    {
        return News::with([
            'translations.language',
            'sliderImage'
        ])
            ->where('is_featured', true)
            ->whereDate('featured_expired_date', '>=', now())
            ->whereNotNull('slider_image_id')
            ->orderBy('publish_date', 'desc')
            ->get()
            ->map(function ($news) {
                return [
                    'id' => $news->id,
                    'translations' => $news->translations->reduce(function ($acc, $translation) {
                        $langCode = $translation->language->code;
                        $acc[$langCode] = [
                            'title' => $translation->title,
                            'slug' => $translation->slug,
                        ];
                        return $acc;
                    }, []),
                    'slider_image' => $news->sliderImage ? [
                        'id' => $news->sliderImage->id,
                        'path' => $news->sliderImage->path,
                    ] : null,
                    'is_featured' => true,
                    'featured_expired_date' => $news->featured_expired_date,
                ];
            });
    }

    public function getNewsDetail(string $slug): array
    {
        $newsTranslation = NewsTranslation::where('slug', $slug)
            ->where('language_id', 1)
            ->with([
                'news.media',
                'news.category.translations' => function($query) {
                    $query->where('language_id', 1);
                },
                'news.tags.translations' => function($query) {
                    $query->where('language_id', 1);
                }
            ])
            ->firstOrFail();

        $news = $newsTranslation->news;

        return [
            'id' => $news->id,
            'translations' => [
                'id' => [
                    'title' => $newsTranslation->title,
                    'slug' => $newsTranslation->slug,
                    'content' => $newsTranslation->content,
                ]
            ],
            'media' => [
                'id' => $news->media->id,
                'file_name' => $news->media->file_name,
                'mime_type' => $news->media->mime_type,
                'path' => $news->media->path,
                'paths' => $news->media->paths,
                'size' => $news->media->size,
                'url' => $news->media->url,
            ],
            'category' => $news->category ? [
                'id' => $news->category->id,
                'translations' => [
                    'id' => [
                        'name' => $news->category->translations->first()?->name,
                        'slug' => $news->category->translations->first()?->slug,
                    ]
                ]
            ] : null,
            'tags' => $news->tags->map(function($tag) {
                return [
                    'value' => (string) $tag->id,
                    'label' => $tag->translations->first()?->name ?? '',
                ];
            })->toArray(),
            'status' => $news->status,
            'path' => $news->path,
            'is_featured' => (bool) $news->is_featured,
            'publish_date' => $news->publish_date?->format('Y-m-d'),
            'created_at' => $news->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $news->updated_at->format('Y-m-d H:i:s'),
        ];
    }


    public function getLatestEvents(int $limit = 3)
    {
        $indonesianLanguage = Language::where('code', 'id')->first();

        return Event::with([
            'translations' => function($query) use ($indonesianLanguage) {
                $query->where('language_id', $indonesianLanguage->id);
            },
            'media',
            'category.translations' => function($query) use ($indonesianLanguage) {
                $query->where('language_id', $indonesianLanguage->id);
            },
            'tags.translations' => function($query) use ($indonesianLanguage) {
                $query->where('language_id', $indonesianLanguage->id);
            }
        ])
//            ->where('status', 'published')
//            ->where('end_date', '>=', now()) // Hanya event yang belum berakhir
            ->orderBy('start_date', 'asc') // Urutkan berdasarkan tanggal mulai terdekat
            ->limit($limit)
            ->get()
            ->map(function ($event) {
                $translation = $event->translations->first();

                return [
                    'id' => $event->id,
                    'translations' => [
                        'id' => [
                            'title' => $translation?->title,
                            'slug' => $translation?->slug,
                            'description' => $translation?->description,
                        ]
                    ],
                    'formatted_date' => $event->start_date->format('d F Y'), // Format tanggal
                    'event_status' => $event->end_date->isPast() ? 'Selesai' : 'Akan Datang',
                    'category' => $event->category ? [
                        'id' => $event->category->id,
                        'translations' => [
                            'id' => [
                                'name' => $event->category->translations->first()?->name,
                                'slug' => $event->category->translations->first()?->slug,
                            ]
                        ]
                    ] : null,
                    'media' => $event->media ? [
                        'id' => $event->media->id,
                        'path' => $event->media->path,
                        'paths' => $event->media->paths,
                    ] : null,
                    'tags' => $event->tags->map(fn($tag) => [
                        'value' => (string) $tag->id,
                        'label' => $tag->translations->first()?->name
                    ]),
                    'status' => $event->status,
                    'is_featured' => $event->is_featured,
                    'start_date' => $event->start_date->format('Y-m-d H:i:s'),
                    'end_date' => $event->end_date->format('Y-m-d H:i:s'),
                    'location' => $event->location,
                    'type' => $event->type,
                    'platform' => $event->platform,
                    'meeting_url' => $event->meeting_url,
                    'registration_url' => $event->registration_url,
                    'quota' => $event->quota,
                    'is_free' => $event->is_free,
                    'price' => $event->price,
                    'created_at' => $event->created_at->format('Y-m-d H:i:s'),
                ];
            });
    }

    public function getEventDetail(string $slug)
    {
        $indonesianLanguage = Language::where('code', 'id')->first();

        $event = Event::with([
            'translations' => function($query) use ($indonesianLanguage) {
                $query->where('language_id', $indonesianLanguage->id);
            },
            'media',
            'category.translations' => function($query) use ($indonesianLanguage) {
                $query->where('language_id', $indonesianLanguage->id);
            },
            'tags.translations' => function($query) use ($indonesianLanguage) {
                $query->where('language_id', $indonesianLanguage->id);
            }
        ])
            ->whereHas('translations', function($query) use ($slug, $indonesianLanguage) {
                $query->where('slug', $slug)
                    ->where('language_id', $indonesianLanguage->id);
            })
            ->firstOrFail();

        $translation = $event->translations->first();

        return [
            'id' => $event->id,
            'translations' => [
                'id' => [
                    'title' => $translation?->title,
                    'slug' => $translation?->slug,
                    'description' => $translation?->description,
                    'content' => $translation->content ?? null,

                ]
            ],
            'formatted_date' => $event->start_date->format('d F Y'),
            'event_status' => $event->end_date->isPast() ? 'Selesai' : 'Akan Datang',
            'category' => $event->category ? [
                'id' => $event->category->id,
                'translations' => [
                    'id' => [
                        'name' => $event->category->translations->first()?->name,
                        'slug' => $event->category->translations->first()?->slug,
                    ]
                ]
            ] : null,
            'media' => $event->media ? [
                'id' => $event->media->id,
                'path' => $event->media->path,
                'paths' => $event->media->paths,
            ] : null,
            'tags' => $event->tags->map(fn($tag) => [
                'value' => (string) $tag->id,
                'label' => $tag->translations->first()?->name
            ]),
            'status' => $event->status,
            'is_featured' => $event->is_featured,
            'start_date' => $event->start_date->format('Y-m-d H:i:s'),
            'end_date' => $event->end_date->format('Y-m-d H:i:s'),
            'location' => $event->location,
            'type' => $event->type,
            'platform' => $event->platform,
            'meeting_url' => $event->meeting_url,
            'registration_url' => $event->registration_url,
            'quota' => $event->quota,
            'is_free' => $event->is_free,
            'price' => $event->price,
            'created_at' => $event->created_at->format('Y-m-d H:i:s'),
        ];
    }

    public function getActiveSliders(int $limit = 3)
    {
        return DefaultSlider::with('media')
            ->where('is_active', true)
            ->orderBy('order')
            ->limit($limit)
            ->get()
            ->map(function ($slide) {
                return [
                    'id' => $slide->id,
                    'media' => [
                        'id' => $slide->media->id,
                        'file_name' => $slide->media->file_name,
                        'mime_type' => $slide->media->mime_type,
                        'path' => $slide->media->path,
                        'size' => $slide->media->size,
                        'url' => $slide->media->url,
                        'paths' => [
                            'blur' => $slide->media->paths['blur'],
                            'original' => $slide->media->paths['original'],
                            'thumbnail' => $slide->media->paths['thumbnail']
                        ]
                    ],
                    'url' => $slide->url,
                    'order' => $slide->order,
                    'is_active' => (bool) $slide->is_active
                ];
            });
    }

}
