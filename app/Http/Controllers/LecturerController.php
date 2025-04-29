<?php

namespace App\Http\Controllers;

use App\Http\Requests\LecturerRequest;
use App\Models\Lecturer;
use App\Services\LecturerService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LecturerController extends Controller
{
    public function __construct(private LecturerService $lecturerService)
    {}

    public function index()
    {
        return Inertia::render('Admin/Lecturer/Index');
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

    public function updateOrder(Request $request, Lecturer $lecturer)
    {
        try {
            $this->lecturerService->updateOrder($lecturer, $request->order);
            
            return response()->json([
                'status' => true,
                'message' => 'Urutan berhasil diperbarui'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memperbarui urutan'
            ], 500);
        }
    }
}