<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResponseApi;
use App\Models\Media;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MediaController extends Controller 
{
    protected $mediaService;

    public function __construct(MediaService $mediaService)
    {
        $this->mediaService = $mediaService;
    }

    public function indexView()
    {
        $media = $this->mediaService->getAll();

        return Inertia::render("Media/Index", [
            "media" => $media
        ]);
    }

    public function index()
    {
        try {
            $media = $this->mediaService->getAll();
            return ResponseApi::success($media, 'Media retrieved successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Failed to retrieve media', 500, ['error' => $e->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|image|max:5120'
        ]);

        try {
            $media = $this->mediaService->upload($request->file('file'));
            
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
                'files.*' => 'required|file|max:2048|mimes:jpeg,png,jpg,gif'
            ]);

            $result = $this->mediaService->create($request->file('files'), $userId);
            
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