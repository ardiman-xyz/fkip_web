<?php

namespace App\Http\Controllers;

use App\Http\Requests\LecturerRequest;
use App\Models\Lecturer;
use App\Models\StudyProgram;
use App\Services\LecturerService;
use Illuminate\Http\JsonResponse;
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

    public function getStudyProgramLecturers(int $studyProgramId)
    {
        try {
            // Gunakan query langsung ke database untuk lecturers dengan study_program_id tertentu
            $lecturers = Lecturer::where('study_program_id', $studyProgramId)
                ->with(['academicPosition', 'media', 'translations'])
                ->get()
                ->map(function ($lecturer) {
                    return [
                        'id' => $lecturer->id,
                        'name' => $lecturer->translations->where('locale', 'id')->first()->full_name ?? $lecturer->academic_title ?? 'Unnamed',
                        'nip' => $lecturer->nip,
                        'nidn' => $lecturer->nidn,
                        'position' => $lecturer->academicPosition?->name,
                        'education' => $lecturer->translations->where('locale', 'id')->first()->education_history ?? null,
                        'photo' => $lecturer->media ? ($lecturer->media->path ?? $lecturer->media->url ?? null) : null,
                        // Tampilkan status dan role dari kolom langsung di tabel lecturer
                        // karena bukan dari pivot table
                        'pivot' => [
                            'role' => null, // Tidak ada di kolom lecturer
                            'is_active' => $lecturer->status === 'active'
                        ]
                    ];
                });
            
            return response()->json([
                'status' => true,
                'data' => $lecturers
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memuat data dosen program studi',
                'error' => $e->getMessage()
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