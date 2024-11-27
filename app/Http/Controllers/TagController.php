<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Http\Resources\ResponseApi;
use App\Models\Tag;
use App\Services\TagService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{

    public function __construct(
        protected TagService $tagService
    ){}

    public function index() 
    {
        return Inertia::render("Tag/Index");
    }

    public function getAll()
    {
        try {
            $tags = $this->tagService->getAllWithTranslations();
            return ResponseApi::success($tags, 'Tags retrieved successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Failed to retrieve tags', 500, ['exception' => $e->getMessage()]);
        }
    }

    public function update(UpdateTagRequest $request, Tag $tag)
    {
        try {
            $validatedData = $request->validated();
            $updatedTag = $this->tagService->update($tag, $validatedData);
            return ResponseApi::success($updatedTag, 'Tag updated successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Failed to update tag', 500, ['exception' => $e->getMessage()]);
        }
    }

    public function destroy(Tag $tag)
    {
        try {
            $this->tagService->delete($tag);
            return ResponseApi::success(null, 'Tag deleted successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Failed to delete tag', 500, ['exception' => $e->getMessage()]);
        }
    }

    public function store(StoreTagRequest $request)
    {

        try {
            $validatedData = $request->validated();
            
            $tag = $this->tagService->create($validatedData);
            
            return ResponseApi::success(
                data: $tag,
                message: 'Tag created successfully'
            );

        } catch (Exception $e) {
            return ResponseApi::error(
                message: 'Failed to create tag',
                code: 500,
                errors: [
                    'exception' => $e->getMessage()
                ]
            );
        }
    }
}
