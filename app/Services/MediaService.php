<?php

namespace App\Services;

use App\Events\MediaUploaded;
use App\Models\Event;
use App\Models\EventTranslation;
use App\Models\Media;
use App\Models\News;
use App\Models\NewsTranslation;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
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


    public function create(array $files): array
    {
        $results = [];
        $errors = [];

        foreach ($files as $file) {
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


                $results[] = $media;

            } catch (\Exception $e) {
                $errors[] = [
                    'file' => $file->getClientOriginalName(),
                    'error' => $e->getMessage()
                ];
            }
        }

        return [
            'uploaded' => $results,
            'failed' => $errors
        ];
    }

    public function deleteById(Media $media): array
    {
        try {
            // Check media usage in all related models
            $usageCheck = $this->checkMediaUsage($media);
            
            if ($usageCheck['isUsed']) {
                throw new \Exception("Media sedang digunakan di: " . $usageCheck['usedIn']);
            }

            // Delete file from storage
            Storage::delete($media->path);
            
            $media->delete();

            return [
                'success' => true,
                'message' => 'Media berhasil dihapus'
            ];

        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }



    private function checkMediaUsage(Media $media): array
    {
        $usedIn = [];
        
        // Check in events
        $usedInEvents = Event::where('media_id', $media->id)->first();
        if ($usedInEvents) {
            $usedIn[] = "Event (" . $usedInEvents->translations()
                ->whereHas('language', function($q) {
                    $q->where('code', 'id');
                })
                ->first()?->title . ")";
        }
    
        // Check in Event translations (content might contain media references)
        $eventTranslations = EventTranslation::whereRaw('content LIKE ?', ['%' . $media->id . '%'])->first();
        if ($eventTranslations) {
            $usedIn[] = "Konten Event (" . $eventTranslations->event->translations()
                ->whereHas('language', function($q) {
                    $q->where('code', 'id');
                })
                ->first()?->title . ")";
        }
        
        // Check in news
        $usedInNews = News::where('media_id', $media->id)->first();
        if ($usedInNews) {
            $usedIn[] = "News (" . $usedInNews->translations()
                ->whereHas('language', function($q) {
                    $q->where('code', 'id');
                })
                ->first()?->title . ")";
        }
    
        // Check in News translations (content might contain media references)
        $newsTranslations = NewsTranslation::whereRaw('content LIKE ?', ['%' . $media->id . '%'])->first();
        if ($newsTranslations) {
            $usedIn[] = "Konten News (" . $newsTranslations->news->translations()
                ->whereHas('language', function($q) {
                    $q->where('code', 'id');
                })
                ->first()?->title . ")";
        }
    
        return [
            'isUsed' => count($usedIn) > 0,
            'usedIn' => implode(", ", $usedIn)
        ];
    }
}