<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResponseApi;
use App\Services\MediaService;
use Illuminate\Http\Request;

class MediaController extends Controller 
{
    protected $mediaService;

    public function __construct(MediaService $mediaService)
    {
        $this->mediaService = $mediaService;
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
}