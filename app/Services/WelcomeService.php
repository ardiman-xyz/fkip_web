<?php

namespace App\Services;

use App\Models\Announcement;
use App\Models\Category;
use App\Models\DefaultSlider;
use App\Models\Event;
use App\Models\News;
use App\Models\Language;
use App\Models\NewsTranslation;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

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



        public function getAllNews(int $perPage = 10, array $filters = []): LengthAwarePaginator
        {
            $query = News::with([
                'translations.language',
                'media',
                'category.translations.language',
                'tags.translations.language'
            ])
                ->where('status', 'published')
                ->where('publish_date', '<=', now())
                ->orderByDesc('publish_date');

            // Filter berdasarkan kategori
            if (!empty($filters['category'])) {
                $query->whereHas('category', function ($q) use ($filters) {
                    $q->where('id', $filters['category']);
                });
            }

            // Filter berdasarkan tag
            if (!empty($filters['tag'])) {
                $query->whereHas('tags', function ($q) use ($filters) {
                    $q->where('id', $filters['tag']);
                });
            }

            // Filter berdasarkan pencarian
            if (!empty($filters['search'])) {
                $query->whereHas('translations', function ($q) use ($filters) {
                    $q->where('title', 'like', '%' . $filters['search'] . '%')
                    ->orWhere('content', 'like', '%' . $filters['search'] . '%');
                });
            }

            $paginator = $query->paginate($perPage);

            $mapped = $paginator->getCollection()->map(function ($news) {
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

            // Set collection hasil mapping ke dalam paginator yang sama
            return new LengthAwarePaginator(
                $mapped,
                $paginator->total(),
                $paginator->perPage(),
                $paginator->currentPage(),
                ['path' => request()->url(), 'query' => request()->query()]
            );
        }

    /**
     * Mendapatkan semua kategori berita dengan jumlah berita
     */
    public function getAllCategories()
    {
        return Category::withCount(['news' => function ($query) {
            $query->where('status', 'published')
                 ->where('publish_date', '<=', now());
        }])
        ->with('translations')
        ->get()
        ->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->translations->firstWhere('language_id', 1)->name ?? '',
                'slug' => $category->translations->firstWhere('language_id', 1)->slug ?? '',
                'count' => $category->news_count
            ];
        });
    }

    /**
     * Mendapatkan berita populer
     */
    public function getPopularNews($limit = 5)
    {
        return News::with([
                'translations.language',
                'media',
                'category.translations.language',
                'tags.translations.language'
            ])
            ->where('status', 'published')
            ->where('publish_date', '<=', now())
            ->orderByDesc('publish_date') // bisa diganti dengan orderBy('views', 'desc') jika ada kolom views
            ->limit($limit)
            ->get()
            ->map(fn($news) => $this->formatNewsData($news));
    }
    

    /**
     * Format data berita untuk response
     */
    private function formatNewsData($news): array
    {
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
    }
    



    public function getLatestAnnouncements($limit = 6)
    {
        return Announcement::with([
            'translations' => function ($query) {
                $query->with('language');
            },
            'media',
            'user'
        ])
        ->where('status', 'published')
        ->where(function ($query) {
            $query->whereNull('published_at')
                ->orWhere('published_at', '<=', now());
        })
        ->orderBy('priority', 'desc') // urgent, high, normal, low
        ->orderBy('created_at', 'desc')
        ->limit($limit)
        ->get()
        ->map(function ($announcement) {
            return $this->formatAnnouncementData($announcement);
        });
    }

    private function formatAnnouncementData($announcement)
    {
        $translations = [];
        foreach ($announcement->translations as $translation) {
            $translations[$translation->language->code] = [
                'title' => $translation->title,
                'content' => $translation->content,
                'excerpt' => $translation->excerpt,
            ];
        }

        $isNew = $announcement->created_at->gte(now()->subDays(7));

        return [
            'id' => $announcement->id,
            'title' => $translations['id']['title'] ?? $translations['en']['title'] ?? 'Untitled',
            'content' => $translations['id']['content'] ?? $translations['en']['content'] ?? null,
            'excerpt' => $translations['id']['excerpt'] ?? $translations['en']['excerpt'] ?? null,
            'priority' => $announcement->priority,
            'date' => $announcement->created_at->format('Y-m-d'),
            'formatted_date' => $announcement->created_at->format('d M Y'),
            'isNew' => $isNew,
            'action' => $announcement->action,
            'translations' => $translations,
            // Update media structure
            'media' => $announcement->media ? [
                'id' => $announcement->media->id,
                'file_name' => $announcement->media->file_name,
                'mime_type' => $announcement->media->mime_type,
                'path' => $announcement->media->path,
                'paths' => $announcement->media->paths,
                'size' => $announcement->media->size,
                'url' => $announcement->media->url,
            ] : null,
            // Keep backward compatibility
            'image' => $announcement->media ? $announcement->media->path : null,
        ];
    }



    public function getAllAnnouncements($perPage = 12, $filters = [])
    {
        $query = Announcement::with([
            'translations' => function ($query) {
                $query->with('language');
            },
            'media',
            'user'
        ])
        ->where('status', 'published')
        ->where(function ($query) {
            $query->whereNull('published_at')
                ->orWhere('published_at', '<=', now());
        });

        // Apply filters
        if (!empty($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        if (!empty($filters['search'])) {
            $query->whereHas('translations', function ($q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['search'] . '%')
                ->orWhere('content', 'like', '%' . $filters['search'] . '%');
            });
        }

        return $query->orderBy('priority', 'desc')
                    ->orderBy('created_at', 'desc')
                    ->paginate($perPage)
                    ->through(function ($announcement) {
                        return $this->formatAnnouncementData($announcement);
                    });
    }

    public function getAnnouncementDetail(string $slug)
    {
        // Extract ID from slug (slug format: title-slug-123)
        $id = (int) Str::afterLast($slug, '-');
        
        $announcement = Announcement::with([
            'translations' => function ($query) {
                $query->with('language');
            },
            'media',
            'user'
        ])
        ->where('id', $id)
        ->where('status', 'published')
        ->firstOrFail();

        // Increment view count
        $announcement->increment('view_count');

        return $this->formatAnnouncementDetailData($announcement);
    }

    private function formatAnnouncementDetailData($announcement)
    {
        $translations = [];
        foreach ($announcement->translations as $translation) {
            $translations[$translation->language->code] = [
                'title' => $translation->title,
                'content' => $translation->content,
                'excerpt' => $translation->excerpt,
            ];
        }

        $isNew = $announcement->created_at->gte(now()->subDays(7));

        return [
            'id' => $announcement->id,
            'title' => $translations['id']['title'] ?? $translations['en']['title'] ?? 'Untitled',
            'content' => $translations['id']['content'] ?? $translations['en']['content'] ?? '',
            'excerpt' => $translations['id']['excerpt'] ?? $translations['en']['excerpt'] ?? null,
            // Handle media yang bisa null
            'media' => $announcement->media ? [
                'id' => $announcement->media->id,
                'file_name' => $announcement->media->file_name,
                'mime_type' => $announcement->media->mime_type,
                'path' => $announcement->media->path,
                'paths' => $announcement->media->paths,
                'size' => $announcement->media->size,
                'url' => $announcement->media->url,
            ] : null,
            'priority' => $announcement->priority,
            'date' => $announcement->created_at->format('Y-m-d'),
            'formatted_date' => $announcement->created_at->format('d M Y'),
            'isNew' => $isNew,
            'author' => $announcement->user->name,
            'view_count' => $announcement->view_count,
            'action' => $announcement->action,
            'translations' => $translations,
        ];
    }


    /**
     * Get all events with pagination and filters
     */
    public function getAllEvents(int $perPage = 12, array $filters = []): array
    {
        $query = Event::with([
            'translations.language',
            'media',
            'category.translations.language',
            'tags.translations.language'
        ])
        ->orderBy('start_date', 'asc');

        // Filter by category
        if (!empty($filters['category'])) {
            $query->whereHas('category', function ($q) use ($filters) {
                $q->where('id', $filters['category']);
            });
        }

        // Filter by search term
        if (!empty($filters['search'])) {
            $query->whereHas('translations', function ($q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['search'] . '%')
                ->orWhere('content', 'like', '%' . $filters['search'] . '%');
            });
        }

        // Filter by status (upcoming, ongoing, completed)
        if (!empty($filters['status']) && $filters['status'] !== 'all') {
            $now = now();
            
            switch ($filters['status']) {
                case 'upcoming':
                    $query->where('start_date', '>', $now);
                    break;
                case 'ongoing':
                    $query->where('start_date', '<=', $now)
                        ->where('end_date', '>=', $now);
                    break;
                case 'completed':
                    $query->where('end_date', '<', $now);
                    break;
            }
        }

        $events = $query->paginate($perPage);

        // Format the events data
        $formattedEvents = $events->getCollection()->map(function ($event) {
            return $this->formatEventData($event);
        });

        return [
            'data' => $formattedEvents,
            'current_page' => $events->currentPage(),
            'last_page' => $events->lastPage(),
            'per_page' => $events->perPage(),
            'total' => $events->total(),
            'from' => $events->firstItem(),
            'to' => $events->lastItem(),
        ];
    }

   /**
     * Get event categories with count
     */
    public function getEventCategories(): array
    {
        // Get categories that are used by published events
        $categoriesWithEvents = Category::select('categories.*')
            ->join('events', 'categories.id', '=', 'events.category_id')
            ->where('events.status', 'published')
            ->with(['translations' => function($query) {
                $query->where('language_id', 1); // Indonesian language
            }])
            ->groupBy('categories.id')
            ->get();

        // Count events for each category
        $categoriesWithCount = $categoriesWithEvents->map(function ($category) {
            $eventCount = Event::where('category_id', $category->id)
                ->where('status', 'published')
                ->count();

            return [
                'id' => (string) $category->id,
                'name' => $category->translations->first()?->name ?? 'Untitled',
                'count' => $eventCount
            ];
        });

        // Add "All" category
        $totalEvents = Event::where('status', 'published')->count();
        
        $allCategory = [
            'id' => 'all',
            'name' => 'Semua',
            'count' => $totalEvents
        ];

        return collect([$allCategory])->concat($categoriesWithCount)->toArray();
    }


    /**
     * Format event data for display
     */
    private function formatEventData($event): array
    {
        $translations = $event->translations->reduce(function ($acc, $translation) {
            $langCode = $translation->language->code;
            $acc[$langCode] = [
                'title' => $translation->title,
                'slug' => $translation->slug,
                'description' => $translation->description,
                'content' => $translation->content,
            ];
            return $acc;
        }, []);

        $categoryTranslations = $event->category?->translations->reduce(function ($acc, $translation) {
            $langCode = $translation->language->code;
            $acc[$langCode] = [
                'name' => $translation->name,
                'slug' => $translation->slug,
            ];
            return $acc;
        }, []);

        return [
            'id' => $event->id,
            'translations' => $translations,
            'formatted_date' => $this->formatEventDateTime($event->start_date, $event->end_date),
            'event_status' => $this->getEventStatus($event->start_date, $event->end_date),
            'category' => $event->category ? [
                'id' => $event->category->id,
                'translations' => $categoryTranslations
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

    /**
     * Format event date and time
     */
    private function formatEventDateTime($startDate, $endDate): string
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

    /**
     * Get event status based on dates
     */
    private function getEventStatus($startDate, $endDate): string
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
