<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\ResponseApi;
use App\Models\News;
use App\Services\CategoryService;
use App\Services\NewsService;
use App\Services\TagService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class NewsController extends Controller
{
   

    public function __construct(
        protected NewsService $newsService,
        protected CategoryService $categoryService,
        protected TagService $tagService
    ){}


    public function index()
    {
        $news = $this->newsService->getAllWithTranslations();
        
        // Ambil data dari API simpeg
        // try {
        //     $response = Http::get('https://simpeg.umkendari.ac.id/api/pegawai/fakultas/15');
            
        //     if ($response->successful()) {
        //         $pegawaiData = $response->json();
                
        //         // Tampilkan hasil dengan var_dump dan hentikan eksekusi
        //         var_dump($pegawaiData);
        //         die(); // atau bisa menggunakan dd($pegawaiData);
        //     } else {
        //         // Jika terjadi error pada API
        //         var_dump('Gagal mengambil data: ' . $response->status());
        //         die();
        //     }
        // } catch (\Exception $e) {
        //     // Tangani error jika ada masalah dengan koneksi
        //     var_dump('Error: ' . $e->getMessage());
        //     die();
        // }

        // Kode ini tidak akan dijalankan karena sudah di-die() sebelumnya
        return Inertia::render("News/Index", [
            'news' => $news
        ]);
    }

    public function create()
    {
        $categories = $this->categoryService->getAllWithTranslationsLabelAndValues();
        $tags = $this->tagService->getAllWithTranslationsLabelAndValues();
    
        return Inertia::render("News/Create", [
            'categories' => $categories,
            'tags' => $tags
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

    public function edit(News $news)
    {
        $news = $this->newsService->getWithTranslationsByNews($news);
        $categories = $this->categoryService->getAllWithTranslationsLabelAndValues();
        $tags = $this->tagService->getAllWithTranslationsLabelAndValues();

        return Inertia::render('News/Edit', [
            'news' => $news,
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    public function update(UpdateNewsRequest $request, News $news)
    {
        try {
            $updatedNews = $this->newsService->update($news, $request->validated());
            return ResponseApi::success($updatedNews, 'News updated successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Failed to update news', 500, ['error' => $e->getMessage()]);
        }
    }

    public function destroy(News $news)
    {
        try {
            $this->newsService->delete($news);
            return ResponseApi::success(null, 'News deleted successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Failed to delete news', 500, ['error' => $e->getMessage()]); 
        }
    }
}
