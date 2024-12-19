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

        return Inertia::render('Welcome', [
            "news" => $news,
        ]);
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

}
