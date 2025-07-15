<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\ResponseApi;
use App\Models\Category;
use App\Services\CategoryService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{

    public function __construct(protected CategoryService $categoryService)
    {
        
    }

    public function index() 
    {
        return Inertia::render("Category/Index");
    }


    public function getAll()
    {
        try {
            $category = $this->categoryService->getAllWithTranslations();
            // if ($category->isEmpty()) {
            //     return ResponseApi::error('No categories found', 404);
            // }
            return ResponseApi::success($category, 'Categorys retrieved successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Failed to retrieve cate$category', 500, ['exception' => $e->getMessage()]);
        }
    }


    public function store(StoreCategoryRequest $request)
    {

        try {
            $validatedData = $request->validated();
            
            $category = $this->categoryService->create($validatedData);
            
            return ResponseApi::success(
                data: $category,
                message: 'Category created successfully'
            );

        } catch (Exception $e) {
            return ResponseApi::error(
                message: 'Failed to create category',
                code: 500,
                errors: [
                    'exception' => $e->getMessage()
                ]
            );
        }
    }


    public function update(UpdateCategoryRequest $request, Category $category)
    {
        try {
            $validatedData = $request->validated();
            $updatedCategory = $this->categoryService->update($category, $validatedData);
            return ResponseApi::success($updatedCategory, 'Category updated successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Failed to update category', 500, ['exception' => $e->getMessage()]);
        }
    

    }
    
    public function destroy(Category $category)
    {
        try {
            $this->categoryService->delete($category);
            return ResponseApi::success(null, 'Category deleted successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Failed to delete category', 500, ['exception' => $e->getMessage()]);
        }
    }

}
