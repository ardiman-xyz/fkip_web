<?php

namespace App\Services;

use App\Models\StudyProgram;
use App\Models\EducationLevel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class StudyProgramService
{

    public function getStudyProgramsGroupedByEducationLevel()
    {
        $educationLevels = EducationLevel::with(['studyPrograms' => function($query) {
            $query->where('status', 'active')
                  ->orderBy('name');
        }])
        ->orderBy('order')
        ->orderBy('id')
        ->get();

        // Format data untuk frontend
        return $educationLevels->map(function($level) {
            return [
                'id' => $level->id,
                'name' => $level->name,
                'code' => $level->code,
                'slug' => $level->slug,
                'study_programs' => $level->studyPrograms->map(function($program) {
                    return [
                        'id' => $program->id,
                        'name' => $program->name,
                        'program_code' => $program->program_code,
                        'department_id' => $program->department_id,
                        'faculty_name' => $program->faculty_name,
                        'status' => $program->status,
                        'created_at' => $program->created_at,
                        'updated_at' => $program->updated_at
                    ];
                }),
                'study_programs_count' => $level->studyPrograms->count()
            ];
        });
    }

    public function getEducationLevelsWithCounts()
    {
        return EducationLevel::withCount(['studyPrograms' => function($query) {
            $query->where('status', 'active');
        }])
        ->orderBy('order')
        ->get()
        ->map(function($level) {
            return [
                'id' => $level->id,
                'name' => $level->name,
                'code' => $level->code,
                'slug' => $level->slug,
                'count' => $level->study_programs_count
            ];
        });
    }


    public function getStudyProgramsByEducationLevel($educationLevelId)
    {
        return StudyProgram::where('education_level_id', $educationLevelId)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();
    }

   public function getEducationLevelsWithPrograms()
    {
        return EducationLevel::with(['studyPrograms' => function($query) {
            $query->where('status', 'active')
                  ->orderBy('created_at', 'desc');
        }])
        ->get()
        ->map(function ($level) {
            return [
                'id' => $level->id,
                'name' => $level->name,
                'code' => $level->code,
                'slug' => $level->slug ?? Str::slug($level->name),
                'study_programs' => $level->studyPrograms,
                'study_programs_count' => $level->studyPrograms->count()
            ];
        });
    }   

    public function create(array $data): StudyProgram
    {
        return DB::transaction(function () use ($data) {
            // Prepare data with only the required fields
            $programData = [
                'name' => $data['name'],
                'education_level_id' => $data['education_level_id'],
            ];
            
            // Generate program code automatically
            $educationLevel = EducationLevel::find($data['education_level_id']);
            $count = StudyProgram::where('education_level_id', $data['education_level_id'])->count();
            $programData['program_code'] = strtoupper($educationLevel->code) . str_pad($count + 1, 3, '0', STR_PAD_LEFT);
            
            // Set default values
            $programData['status'] = 'active';
            $programData['faculty_id'] = 15; // Default FKIP
            $programData['faculty_name'] = 'KEGURUAN DAN ILMU PENDIDIKAN';
            
            return StudyProgram::create($programData);
        });
    }

    public function update(int $id, array $data): StudyProgram
    {
        $studyProgram = StudyProgram::findOrFail($id);
        
        DB::transaction(function () use ($studyProgram, $data) {
            $studyProgram->update($data);
        });
        
        return $studyProgram->fresh();
    }

    // public function delete(int $id): void
    // {
    //     $studyProgram = StudyProgram::findOrFail($id);
        
    //     DB::transaction(function () use ($studyProgram) {
    //         $studyProgram->delete();
    //     });
    // }


     /**
     * Get study program with all related data
     * 
     * @param int $id Study program ID
     * @return StudyProgram
     */
    public function getStudyProgramWithRelations(int $id): StudyProgram
    {
        return StudyProgram::query()
            ->with([
                'educationLevel',
                'description',
                'contact',
                'lecturers' => function($query) {
                    $query->orderByRaw('CASE 
                        WHEN pivot_role LIKE "%kepala%" OR pivot_role LIKE "%kaprodi%" THEN 1 
                        WHEN pivot_role LIKE "%sekretaris%" THEN 2 
                        ELSE 3 END');
                }
            ])
            ->findOrFail($id);
    }

    public function delete(StudyProgram $studyProgram): bool
    {
        return DB::transaction(function () use ($studyProgram) {
            try {
                // Log the deletion
                Log::info('Menghapus program studi:', [
                    'id' => $studyProgram->id,
                    'name' => $studyProgram->name,
                    'code' => $studyProgram->program_code
                ]);
                
                // Delete related records first
                // 1. Delete study program description if exists
                if ($studyProgram->description) {
                    $studyProgram->description->delete();
                }
                
                // 2. Delete study program contact if exists
                if ($studyProgram->contact) {
                    $studyProgram->contact->delete();
                }
                
                // 3. Detach all lecturers if any
                $studyProgram->lecturers()->detach();
                
                // 4. Delete the study program itself
                $deleted = $studyProgram->delete();
                
                if ($deleted) {
                    Log::info('Program studi berhasil dihapus', ['id' => $studyProgram->id]);
                } else {
                    Log::error('Gagal menghapus program studi', ['id' => $studyProgram->id]);
                }
                
                return $deleted;
            } catch (\Exception $e) {
                Log::error('Error saat menghapus program studi:', [
                    'id' => $studyProgram->id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                throw $e;
            }
        });
    }
    
}
