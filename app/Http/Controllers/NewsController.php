<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsRequest;
use App\Http\Resources\ResponseApi;
use App\Services\CategoryService;
use App\Services\NewsService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
   

    public function __construct(
        protected NewsService $newsService,
        protected CategoryService $categoryService
    ){}


    public function index()
    {
        return Inertia::render("News/Index");
    }

    public function create()
    {
        $categories = $this->categoryService->getAllWithTranslationsLabelAndValues();
    
        return Inertia::render("News/Create", [
            'categories' => $categories
        ]);
    }


    public function store(StoreNewsRequest $request)
    {
        try {
            $news = $this->newsService->create($request->validated());
            return ResponseApi::success($news, 'News created successfully');
        } catch (Exception $e) {
            return ResponseApi::error('Failed to create news', 500, ['error' => $e->getMessage()]);
        }
    }
}
