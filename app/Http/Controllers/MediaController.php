<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResponseApi;
use App\Models\Media;
use App\Services\MediaService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MediaController extends Controller
{
    protected MediaService $mediaService;

    public function __construct(MediaService $mediaService)
    {
        $this->mediaService = $mediaService;
    }

    public function indexView(Request $request)
    {
        $perPage = $request->get('per_page', 20);
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $search = $request->get('search');

        $media = $this->mediaService->getPaginated($perPage, $sortBy, $sortOrder, $search);

        return Inertia::render("Media/Index", [
            "media" => $media,
            "filters" => [
                'per_page' => $perPage,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
                'search' => $search,
            ]
        ]);
    }


    public function index(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 20);
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $search = $request->get('search');

            $media = $this->mediaService->getPaginated($perPage, $sortBy, $sortOrder, $search);

            return ResponseApi::success($media, 'Media retrieved successfully');
        } catch (Exception $e) {
            return ResponseApi::error('Failed to retrieve media', 500, ['error' => $e->getMessage()]);
        }
    }


    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240'
        ]);

        try {
            $media = $this->mediaService->uploadFileWithCompress($request->file('file'));

            return ResponseApi::success($media, 'File uploaded successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Upload failed', 500, ['error' => $e->getMessage()]);
        }
    }

    public function storeBatch(Request $request)
    {
        $userId = Auth::id();

        try {
            $request->validate([
                'files' => 'required|array',
                'files.*' => 'required|file|max:10240',
                'quality' => 'nullable|integer|min:1|max:100'
            ]);


            $quality = $request->input('quality', 80);
            $result = $this->mediaService->uploadBatchWithCompress($request->file('files'), $userId, $quality);

            if (count($result['uploaded']) > 0 && count($result['failed']) > 0) {
                return response()->json([
                    'status' => 'partial_success',
                    'message' => 'Some files were uploaded successfully',
                    'data' => $result
                ], 207);
            }

            if (count($result['uploaded']) === 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'All uploads failed',
                    'errors' => $result['failed']
                ], 500);
            }



            return ResponseApi::success($result['uploaded'], 'File uploaded successfully');

        } catch (\Exception $e) {
            return ResponseApi::error('Upload failed', 500, ['error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, Media $media)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255'
            ]);

            $updatedMedia = $this->mediaService->update($media, $request->name);

            return ResponseApi::success($updatedMedia, 'Media updated successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Failed to update media', 500, ['error' => $e->getMessage()]);
        }
    }


    public function destroy(Media $media)
    {
        try {
            $result = $this->mediaService->deleteById($media);

            if (!$result['success']) {
                return response()->json([
                    'success' => false,
                    'message' => $result['message']
                ], 422);
            }

            return response()->json([
                'success' => true,
                'message' => $result['message']
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus media',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
