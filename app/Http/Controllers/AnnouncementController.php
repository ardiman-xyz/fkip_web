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
}
