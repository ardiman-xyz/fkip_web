<?php

// File: app/Services/AnnouncementService.php

namespace App\Services;

use App\Models\Announcement;
use App\Models\AnnouncementTranslation;
use App\Models\Language;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AnnouncementService
{
    /**
     * Get all announcements with translations
     */
    public function getAllWithTranslations()
    {
        return Announcement::with([
            'translations' => function ($query) {
                $query->with('language');
            },
            'media',
            'user',
            'tags.translations' => function ($query) {
                $query->where('language_id', 1); 
            }
        ])
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($announcement) {
            return $this->formatAnnouncementData($announcement);
        });
    }

    /**
     * Create new announcement with translations
     */
        public function create(array $data)
        {
            return DB::transaction(function () use ($data) {
                // Validate pinned dates if needed
                $this->validatePinnedDates($data);

                // Create main announcement record
                $announcement = Announcement::create([
                    'media_id' => $data['media_id'] ?? null,
                    'user_id' => Auth::id(),
                    'status' => $data['status'],
                    'priority' => $data['priority'],
                    'is_featured' => $data['is_featured'] ?? false,
                    'is_pinned' => $data['is_pinned'] ?? false,
                    'published_at' => $data['published_at'] ?? null,
                    'pinned_start_date' => $data['pinned_start_date'] ?? null,
                    'pinned_end_date' => $data['pinned_end_date'] ?? null,
                    'action' => $data['action'] ?? null,
            ]);

            // Create translations
            $this->createTranslations($announcement, $data['translations']);

            // Attach tags if provided
            if (!empty($data['tags'])) {
                $announcement->tags()->attach($data['tags']);
            }

            return $announcement->load(['translations.language', 'media', 'user', 'tags']);
        });
    }

     /**
     * Validate pinned dates
     */
    private function validatePinnedDates(array $data, bool $isUpdate = false)
    {
        if (!empty($data['is_pinned']) && $data['is_pinned']) {
            // Check if pinned dates are provided
            if (empty($data['pinned_start_date']) || empty($data['pinned_end_date'])) {
                throw new \InvalidArgumentException('Tanggal mulai dan berakhir pinned wajib diisi jika pengumuman di-pin');
            }
    
            $startDate = Carbon::parse($data['pinned_start_date'], 'Asia/Makassar');
            $endDate = Carbon::parse($data['pinned_end_date'], 'Asia/Makassar');
            $now = Carbon::now('Asia/Makassar');
    
            // Check if end date is after start date
            if ($endDate->lte($startDate)) {
                throw new \InvalidArgumentException('Tanggal berakhir pinned harus setelah tanggal mulai');
            }
    
            // Check if period is not too long (optional - max 30 days)
            if ($startDate->diffInDays($endDate) > 30) {
                throw new \InvalidArgumentException('Periode pinned maksimal 30 hari');
            }
    
            // Only check past date for new announcements, not for updates
            // Also allow if the start date is today or later
            if (!$isUpdate && $startDate->lt($now->startOfDay())) {
                throw new \InvalidArgumentException('Tanggal mulai pinned tidak boleh di masa lalu');
            }
        }
    }
    /**
     * Update announcement with translations
     */
    public function update(Announcement $announcement, array $data)
    {
        return DB::transaction(function () use ($announcement, $data) {
            // Update main announcement record
            $announcement->update([
                'media_id' => $data['media_id'] ?? null,
                'status' => $data['status'],
                'priority' => $data['priority'],
                'is_featured' => $data['is_featured'] ?? false,
                'is_pinned' => $data['is_pinned'] ?? false,
                'published_at' => $data['published_at'] ?? null,
                'action' => $data['action'] ?? null,
            ]);

            // Update translations
            $this->updateTranslations($announcement, $data['translations']);

            // Sync tags if provided
            if (isset($data['tags'])) {
                $announcement->tags()->sync($data['tags']);
            }

            return $announcement->load(['translations', 'media', 'user', 'tags']);
        });
    }

    /**
     * Delete announcement
     */
    public function delete(Announcement $announcement)
    {
        return DB::transaction(function () use ($announcement) {
            $announcement->translations()->delete();
            
            $announcement->tags()->detach();
            
            $announcement->views()->delete();
            
            return $announcement->delete();
        });
    }

    /**
     * Get announcement with translations for editing
     */
    public function getWithTranslationsByAnnouncement(Announcement $announcement)
    {
        $announcement->load([
            'translations' => function ($query) {
                $query->with('language');
            },
            'media',
            'user',
            'tags'
        ]);

        return $this->formatAnnouncementForEdit($announcement);
    }

    /**
     * Get announcement detail by ID
     */
    public function getDetailById(int $id)
    {
        $announcement = Announcement::with([
            'translations' => function ($query) {
                $query->with('language');
            },
            'media',
            'user',
            'tags.translations'
        ])->findOrFail($id);

        return $this->formatAnnouncementData($announcement);
    }

    /**
     * Create translations for announcement
     */
    private function createTranslations(Announcement $announcement, array $translations)
    {
        $languages = Language::whereIn('code', ['id', 'en'])->get()->keyBy('code');

        foreach ($translations as $langCode => $translation) {
            if (!isset($languages[$langCode])) {
                continue;
            }

            AnnouncementTranslation::create([
                'announcement_id' => $announcement->id,
                'language_id' => $languages[$langCode]->id,
                'title' => $translation['title'],
                'slug' => $this->generateSlug($translation['title'], $announcement->id, $languages[$langCode]->id),
                'content' => $translation['content'] ?? null,
                'excerpt' => $translation['excerpt'] ?? null,
            ]);
        }
    }

    /**
     * Update translations for announcement
     */
    private function updateTranslations(Announcement $announcement, array $translations)
    {
        $languages = Language::whereIn('code', ['id', 'en'])->get()->keyBy('code');

        foreach ($translations as $langCode => $translation) {
            if (!isset($languages[$langCode])) {
                continue;
            }

            $translationRecord = $announcement->translations()
                ->where('language_id', $languages[$langCode]->id)
                ->first();

            if ($translationRecord) {
                $translationRecord->update([
                    'title' => $translation['title'],
                    'slug' => $this->generateSlug($translation['title'], $announcement->id, $languages[$langCode]->id, $translationRecord->id),
                    'content' => $translation['content'] ?? null,
                    'excerpt' => $translation['excerpt'] ?? null,
                ]);
            } else {
                AnnouncementTranslation::create([
                    'announcement_id' => $announcement->id,
                    'language_id' => $languages[$langCode]->id,
                    'title' => $translation['title'],
                    'slug' => $this->generateSlug($translation['title'], $announcement->id, $languages[$langCode]->id),
                    'content' => $translation['content'] ?? null,
                    'excerpt' => $translation['excerpt'] ?? null,
                ]);
            }
        }
    }

    /**
     * Generate unique slug for announcement translation
     */
    private function generateSlug(string $title, int $announcementId, int $languageId, ?int $excludeId = null)
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        $query = AnnouncementTranslation::where('slug', $slug)
            ->where('language_id', $languageId);

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        while ($query->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
            
            $query = AnnouncementTranslation::where('slug', $slug)
                ->where('language_id', $languageId);
                
            if ($excludeId) {
                $query->where('id', '!=', $excludeId);
            }
        }

        return $slug;
    }

    /**
     * Format announcement data for display
     */
    private function formatAnnouncementData(Announcement $announcement)
    {
        $translations = [];
        foreach ($announcement->translations as $translation) {
            $translations[$translation->language->code] = [
                'title' => $translation->title,
                'slug' => $translation->slug,
                'content' => $translation->content,
                'excerpt' => $translation->excerpt,
            ];
        }

        return [
            'id' => $announcement->id,
            'status' => $announcement->status,
            'priority' => $announcement->priority,
            'is_featured' => $announcement->is_featured,
            'is_pinned' => $announcement->is_pinned,
            'published_at' => $announcement->published_at?->format('Y-m-d H:i:s'),
            'view_count' => $announcement->view_count,
            'action' => $announcement->action,
            'created_at' => $announcement->created_at->format('d M Y H:i'),
            'updated_at' => $announcement->updated_at->format('d M Y H:i'),
            'translations' => $translations,
            'pinned_start_date' => $this->formatDateTime($announcement->pinned_start_date, 'd M Y '),
            'pinned_end_date' => $this->formatDateTime($announcement->pinned_end_date, 'd M Y '),
            'media' => $announcement->media ? [
                'id' => $announcement->media->id,
                'name' => $announcement->media->name,
                'path' => $announcement->media->path,
                'paths' => $announcement->media->paths,
            ] : null,
            'author' => $announcement->user->name,
            'tags' => $announcement->tags->pluck('translations.0.name')->filter()->values()->toArray(),
        ];
    }

    /**
     * Helper method to safely format datetime
     */
    private function formatDateTime($datetime, $format = 'Y-m-d H:i:s')
    {
        if (!$datetime) {
            return null;
        }

        // Jika sudah Carbon instance
        if ($datetime instanceof \Carbon\Carbon) {
            return $datetime->format($format);
        }

        // Jika string, convert ke Carbon dulu
        if (is_string($datetime)) {
            try {
                return Carbon::parse($datetime)->format($format);
            } catch (\Exception $e) {
                return null;
            }
        }

        return null;
    }

    /**
     * Format announcement data for editing
     */
    private function formatAnnouncementForEdit(Announcement $announcement)
    {
        $translations = [];
        foreach ($announcement->translations as $translation) {
            $translations[$translation->language->code] = [
                'title' => $translation->title,
                'content' => $translation->content,
                'excerpt' => $translation->excerpt,
            ];
        }

        return [
            'id' => $announcement->id,
            'status' => $announcement->status,
            'priority' => $announcement->priority,
            'is_featured' => $announcement->is_featured,
            'is_pinned' => $announcement->is_pinned,
            'published_at' => $announcement->published_at?->format('Y-m-d\TH:i'),
            'pinned_start_date' => $this->formatDateTime($announcement->pinned_start_date, 'Y-m-d\TH:i'),
            'pinned_end_date' => $this->formatDateTime($announcement->pinned_end_date, 'Y-m-d\TH:i'),
            'action' => $announcement->action,
            'translations' => $translations,
            'media' => $announcement->media ? [
                'id' => $announcement->media->id,
                'name' => $announcement->media->name,
                'path' => $announcement->media->path,
                'paths' => $announcement->media->paths,
            ] : null,
            'tags' => $announcement->tags->pluck('id')->toArray(),
        ];
    }
}