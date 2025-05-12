<?php

namespace App\Services;

use App\Models\StudyProgram;
use App\Models\StudyProgramDescription;
use Illuminate\Support\Facades\DB;

class StudyProgramDescriptionService
{
    /**
     * Create or update description for a study program
     * 
     * @param StudyProgram $studyProgram
     * @param array $data
     * @return StudyProgramDescription
     */
    public function createOrUpdate(StudyProgram $studyProgram, array $data): StudyProgramDescription
    {
        return DB::transaction(function () use ($studyProgram, $data) {
            // Cek apakah sudah ada deskripsi untuk program studi ini
            $description = $studyProgram->description;
            
            if ($description) {
                // Update deskripsi yang sudah ada
                $description->update([
                    'description' => $data['description'],
                    'accreditation' => $data['accreditation'] ?? null,
                    'accreditation_date' => $data['accreditation_date'] ?? null,
                ]);
            } else {
                // Buat deskripsi baru
                $description = new StudyProgramDescription([
                    'description' => $data['description'],
                    'accreditation' => $data['accreditation'] ?? null,
                    'accreditation_date' => $data['accreditation_date'] ?? null,
                ]);
                
                $studyProgram->description()->save($description);
            }
            
            return $description->fresh();
        });
    }

    /**
     * Update an existing description
     * 
     * @param StudyProgramDescription $description
     * @param array $data
     * @return StudyProgramDescription
     */
    public function update(StudyProgramDescription $description, array $data): StudyProgramDescription
    {
        return DB::transaction(function () use ($description, $data) {
            $description->update([
                'description' => $data['description'],
                'accreditation' => $data['accreditation'] ?? null,
                'accreditation_date' => $data['accreditation_date'] ?? null,
            ]);
            
            return $description->fresh();
        });
    }
}
