<?php

namespace App\Services;

use App\Events\MediaUploaded;
use App\Models\Media;
use Illuminate\Http\UploadedFile;

class MediaService
{
    public function upload(UploadedFile $file)
    {
        try {
            $fileName = uniqid() . '_' . $file->getClientOriginalName();
            
            $path = $file->storeAs('media', $fileName, 'public');
            
            $media = Media::create([
                'name' => $file->getClientOriginalName(),
                'file_name' => $fileName,
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
        return Media::latest()->get();
    }

    public function delete($id)
    {
        return Media::findOrFail($id)->delete();
    }
}