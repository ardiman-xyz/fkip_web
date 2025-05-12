<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEducationLevelRequest;
use App\Services\EducationLevelService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class EducationLevelController extends Controller
{
    public function __construct(
        protected EducationLevelService $educationLevelService
    ) {}

    public function index(): InertiaResponse
    {
        $educationLevels = $this->educationLevelService->getAllWithStudyPrograms();
        
        return Inertia::render('StudyProgram/Index', [
            'educationLevels' => $educationLevels
        ]);
    }

    public function store(StoreEducationLevelRequest $request): JsonResponse
    {
        try {
            $educationLevel = $this->educationLevelService->create($request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Jenjang pendidikan berhasil ditambahkan',
                'data' => $educationLevel
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menambahkan jenjang pendidikan',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
