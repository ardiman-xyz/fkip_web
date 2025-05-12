<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudyProgramDescriptionRequest;
use App\Models\StudyProgram;
use App\Models\StudyProgramDescription;
use App\Services\StudyProgramDescriptionService as ServicesStudyProgramDescriptionService;
use Illuminate\Http\JsonResponse;

class StudyProgramDescriptionController extends Controller
{
    protected $descriptionService;

    public function __construct(ServicesStudyProgramDescriptionService $descriptionService)
    {
        $this->descriptionService = $descriptionService;
    }

    /**
     * Store a new description for the study program
     * 
     * @param StoreStudyProgramDescriptionRequest $request
     * @param int $studyProgramId
     * @return JsonResponse
     */
    public function store(StoreStudyProgramDescriptionRequest $request, int $studyProgramId): JsonResponse
    {
        try {
            $studyProgram = StudyProgram::findOrFail($studyProgramId);
            $description = $this->descriptionService->createOrUpdate($studyProgram, $request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Deskripsi program studi berhasil disimpan',
                'data' => $description
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menyimpan deskripsi program studi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing description
     * 
     * @param StoreStudyProgramDescriptionRequest $request
     * @param int $studyProgramId
     * @param int $descriptionId
     * @return JsonResponse
     */
    public function update(StoreStudyProgramDescriptionRequest $request, int $studyProgramId, int $descriptionId): JsonResponse
    {
        try {
            $description = StudyProgramDescription::where('id', $descriptionId)
                ->where('study_program_id', $studyProgramId)
                ->firstOrFail();
            
            $updatedDescription = $this->descriptionService->update($description, $request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Deskripsi program studi berhasil diperbarui',
                'data' => $updatedDescription
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memperbarui deskripsi program studi',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
