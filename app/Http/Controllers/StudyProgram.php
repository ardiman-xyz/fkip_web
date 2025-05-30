<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudyProgramRequest;
use App\Models\StudyProgram as ModelsStudyProgram;
use App\Services\EducationLevelService;
use App\Services\StudyProgramService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudyProgram extends Controller
{

    public function __construct(
        protected EducationLevelService $educationLevelService,
        protected StudyProgramService $studyProgramService
    ) {}

    public function index()
    {
        $educationLevelsWithPrograms = $this->studyProgramService->getStudyProgramsGroupedByEducationLevel();
        
        return Inertia::render('StudyProgram/Index', [
            'educationLevels' => $educationLevelsWithPrograms
        ]);
    }
    

    public function store(StoreStudyProgramRequest $request): JsonResponse
    {

        try {
            $studyProgram = $this->studyProgramService->create($request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Program studi berhasil ditambahkan',
                'data' => $studyProgram
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menambahkan program studi',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function show(int $id)
    {
        $studyProgram = $this->studyProgramService->getStudyProgramWithRelations($id);
        
        return Inertia::render('StudyProgram/Show', [
            'studyProgram' => $studyProgram
        ]);
    }

    public function destroy(ModelsStudyProgram $studyProgram): JsonResponse
    {
        try {
            // Gunakan service untuk menghapus program studi
            $result = $this->studyProgramService->delete($studyProgram);
            
            if ($result) {
                return response()->json([
                    'status' => true,
                    'message' => 'Program studi berhasil dihapus'
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Gagal menghapus program studi'
                ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan saat menghapus program studi',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
