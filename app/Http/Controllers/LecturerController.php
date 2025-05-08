<?php

namespace App\Http\Controllers;

use App\Http\Requests\LecturerRequest;
use App\Models\Lecturer;
use App\Services\LecturerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class LecturerController extends Controller
{
    public function __construct(private LecturerService $lecturerService)
    {}

    public function index()
    {
        return Inertia::render('Admin/Lecturer/Index');
    }

    /**
     * Preview data dosen dari API eksternal
     */
    public function previewFromExternalApi()
    {
        return $this->lecturerService->previewFromExternalApi();
    }

    /**
     * Sinkronisasi data dosen dari API eksternal
     */
    public function syncFromExternalApi(Request $request)
    {
        return $this->lecturerService->syncFromExternalApi($request);
    }
    

    public function getData()
    {
        try {
            $lecturers = $this->lecturerService->getAll();
            
            return response()->json([
                'status' => true,
                'data' => $lecturers
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memuat data dosen'
            ], 500);
        }
    }
    
    public function store(LecturerRequest $request)
    {
        try {
            $lecturer = $this->lecturerService->create($request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Data dosen berhasil disimpan',
                'data' => $lecturer
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menyimpan data dosen'
            ], 500);
        }
    }

    public function update(LecturerRequest $request, Lecturer $lecturer)
    {
        try {
            $lecturer = $this->lecturerService->update($lecturer, $request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Data dosen berhasil diperbarui',
                'data' => $lecturer
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memperbarui data dosen',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Lecturer $lecturer)
    {
        try {
            $this->lecturerService->delete($lecturer);
            
            return response()->json([
                'status' => true,
                'message' => 'Data dosen berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus data dosen'
            ], 500);
        }
    }

}