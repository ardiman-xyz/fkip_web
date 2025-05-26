<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnnouncementRequest;
use App\Models\Announcement;
use App\Services\AnnouncementService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AnnouncementController extends Controller
{

    public function __construct(
        protected AnnouncementService $announcementService,
    ) {}

    public function index()
    {
        $announcements = $this->announcementService->getAllWithTranslations();

        return Inertia::render('Announcement/Index', [
            'announcements' => $announcements
        ]);
    }

    public function create()
    {
        return Inertia::render("Announcement/Create");
    }

    public function store(StoreAnnouncementRequest $request)
    {
        try {
            $announcement = $this->announcementService->create($request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Pengumuman berhasil dibuat',
                'data' => $announcement
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal membuat pengumuman: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Announcement $announcement, Request $request)
        {
        try {
            $validated = $request->validate([
                'status' => 'required|in:draft,published,archived',
                'priority' => 'required|in:low,normal,high,urgent',
                'is_featured' => 'boolean',
                'is_pinned' => 'boolean',
                'published_at' => 'nullable|date',
                'pinned_start_date' => 'nullable|date',
                'pinned_end_date' => 'nullable|date|after:pinned_start_date',
                'media_id' => 'nullable|exists:media,id',
                'action' => 'nullable|array',
                'action.type' => 'nullable|in:download,view,register',
                'action.url' => 'nullable|url',
                'action.label' => 'nullable|string|max:100',
                'translations' => 'required|array',
                'translations.id' => 'required|array',
                'translations.id.title' => 'required|string|max:255',
                'translations.id.content' => 'nullable|string',
                'translations.id.excerpt' => 'nullable|string|max:500',
                'translations.en' => 'required|array',
                'translations.en.title' => 'required|string|max:255',
                'translations.en.content' => 'nullable|string',
                'translations.en.excerpt' => 'nullable|string|max:500',
            ]);

            // Validasi pinned dates jika diperlukan
            if ($validated['is_pinned'] ?? false) {
                if (empty($validated['pinned_start_date']) || empty($validated['pinned_end_date'])) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Tanggal mulai dan berakhir pinned wajib diisi jika pengumuman di-pin'
                    ], 422);
                }
            }

            $updatedAnnouncement = $this->announcementService->update($announcement, $validated);
            
            return response()->json([
                'status' => true,
                'message' => 'Pengumuman berhasil diupdate',
                'data' => $updatedAnnouncement
            ]);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak valid',
                'errors' => $e->errors()
            ], 422);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengupdate pengumuman: ' . $e->getMessage()
            ], 500);
        }
        }

        public function edit(Announcement $announcement)
        {
            $announcementData = $this->announcementService->getWithTranslationsByAnnouncement($announcement);
            
            return Inertia::render('Announcement/Edit', [
                'announcement' => $announcementData
            ]);
        }


    public function destroy(Announcement $announcement)
    {
        try {
            $this->announcementService->delete($announcement);
            
            return response()->json([
                'status' => true,
                'message' => 'Pengumuman berhasil dihapus'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus pengumuman'
            ], 500);
        }
    }


    public function togglePin(Announcement $announcement, Request $request)
    {
        try {
            $data = $request->validate([
                'is_pinned' => 'required|boolean',
                'pinned_start_date' => 'nullable|date',
                'pinned_end_date' => 'nullable|date|after:pinned_start_date',
            ]);

            $announcement->update([
                'is_pinned' => $data['is_pinned'],
                'pinned_start_date' => $data['is_pinned'] ? $data['pinned_start_date'] : null,
                'pinned_end_date' => $data['is_pinned'] ? $data['pinned_end_date'] : null,
            ]);
            
            return response()->json([
                'status' => true,
                'message' => $data['is_pinned'] 
                    ? 'Pengumuman berhasil di-pin' 
                    : 'Pengumuman berhasil di-unpin'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengubah status pin pengumuman'
            ], 500);
        }
    }

}
