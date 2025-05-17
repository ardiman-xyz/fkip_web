<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadMinio extends Controller
{
    public function upload(Request $request)
    {
        try {
            if ($request->hasFile('image')) {
                $request->validate([
                    'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
                ]);
    
                $file = $request->file('image');
                
                $extension = $file->getClientOriginalExtension();
                $fileName = Str::uuid() . '.' . $extension;
                
                $path = Storage::disk('minio')->putFileAs('web', $file, $fileName);
    
                $url = config('filesystems.disks.minio.url') . '/' . config('filesystems.disks.minio.bucket') . '/' . $path;
    
                return response()->json([
                    'success' => true,
                    'path' => $path,
                    'url' => $url,
                    'fileName' => $fileName
                ]);
            }
    
            return response()->json([
                'success' => false,
                'message' => 'No image file uploaded'
            ], 400);
    
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'error_type' => get_class($e)
            ], 500);
        }
    }
}