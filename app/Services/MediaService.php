<?php

namespace App\Services;

use App\Events\MediaUploaded;
use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class MediaService
{
    public function upload(UploadedFile $file)
    {
        try {
            $randomFileName = Str::uuid() . '_' . time() . '.' . $file->getClientOriginalExtension();
            
            $randomSubdirectory = 'media/' . date('Y') . '/' . date('m') . '/' . Str::random(10);

            $path = $file->storeAs($randomSubdirectory, $randomFileName, 'public');

            $media = Media::create([
                'name' => $file->getClientOriginalName(),
                'file_name' => $randomFileName,
                'mime_type' => $file->getMimeType(),
                'path' => $path,
                'size' => $file->getSize()
            ]);

            event(new MediaUploaded($media));

            return $media;

        } catch (\Exception $e) {
            throw $e;
        }
    }


    public function getAll()
    {
        return Media::latest()->limit(50)->get();
    }

    public function delete($id)
    {
        return Media::findOrFail($id)->delete();
    }
}