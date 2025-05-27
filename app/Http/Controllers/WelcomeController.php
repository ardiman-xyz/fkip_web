<?php

namespace App\Http\Controllers;

use App\Services\WelcomeService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class WelcomeController extends Controller
{

    protected WelcomeService $welcomeService;

    public function __construct(WelcomeService $welcomeService)
    {
        $this->welcomeService = $welcomeService;
    }

    public function index(): InertiaResponse
    {
        $news = $this->welcomeService->getLatestNews();
        $events = $this->welcomeService->getLatestEvents();
        $featuredNews = $this->welcomeService->getFeaturedNews();
        $defaultSliders = $this->welcomeService->getActiveSliders();
        $announcements = $this->welcomeService->getLatestAnnouncements();


        return Inertia::render('Welcome', [
            "news" => $news,
            "events" => $events,
            "featuredNews" => $featuredNews,
            "defaultSliders" => $defaultSliders,
            "announcements" => $announcements,
        ]);
    }

    public function news(Request $request)
    {
        $perPage = $request->input('per_page', 12);
        $filters = [
            'category' => $request->input('category'),
            'tag' => $request->input('tag'),
            'search' => $request->input('search'),
        ];
        
        $newsService = new WelcomeService();
        
        $news = $newsService->getAllNews($perPage, $filters);
        $categories = $newsService->getAllCategories();
        $popularNews = $newsService->getPopularNews(5);

        $data = [
            'news' => $news,
            'categories' => $categories,
            'popularNews' => $popularNews,
            'filters' => $filters
        ];

        return Inertia::render("Web/News/AllNews", $data);
    }

    public function newsDetail(string $slug): InertiaResponse
    {
        $news = $this->welcomeService->getNewsDetail($slug);
        $translation = $news['translations']['id'] ?? $news['translations']['en'] ?? null;

        return Inertia::render("Web/News/Detail", [
            'news' => $news,
            'meta' => [
                'title' => $translation['title'] ?? config('app.name'),
                'description' => $translation ? Str::limit(strip_tags($translation['content']), 160) : '',
                'image' => $news['media']['paths']['thumbnail'] ?? '',
                'url' => url()->current(),
                'type' => 'article'
            ]
        ]);
    }

    public function events()
    {
        return Inertia::render("Web/Event/AllEvent");
    }

    public function eventDetail(string $slug): InertiaResponse
    {
        $event = $this->welcomeService->getEventDetail($slug);
        $translation = $event['translations']['id'] ?? $event['translations']['en'] ?? null;

        return Inertia::render("Web/Event/Detail", [
            'event' => $event,
            'meta' => [
                'title' => $translation['title'] ?? config('app.name'),
                'description' => $translation ? Str::limit(strip_tags($translation['description']), 160) : '',
                'image' => $event['media']['paths']['thumbnail'] ?? '',
                'url' => url()->current(),
                'type' => 'article'
            ]
        ]);
    }



        public function announcements(Request $request)
        {
            $perPage = $request->input('per_page', 12);
            $filters = [
                'priority' => $request->input('priority'),
                'search' => $request->input('search'),
            ];
            
            $announcements = $this->welcomeService->getAllAnnouncements($perPage, $filters);

            return Inertia::render("Web/Announcement/Index", [
                'announcements' => $announcements,
                'filters' => $filters
            ]);
        }

        public function announcementDetail(string $slug): InertiaResponse
        {
            $announcement = $this->welcomeService->getAnnouncementDetail($slug);
            $translation = $announcement['translations']['id'] ?? $announcement['translations']['en'] ?? null;

            return Inertia::render("Web/Announcement/Detail", [
                'announcement' => $announcement,
                'meta' => [
                    'title' => $translation['title'] ?? config('app.name'),
                    'description' => $translation ? Str::limit(strip_tags($translation['content']), 160) : '',
                    'image' => $announcement['media']['paths']['thumbnail'] ?? '',
                    'url' => url()->current(),
                    'type' => 'article'
                ]
            ]);
        }

}
