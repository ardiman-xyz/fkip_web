<?php

namespace App\Services;

use App\Models\EducationLevel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EducationLevelService
{
    public function getAllWithStudyPrograms()
    {
        return EducationLevel::with(['studyPrograms' => function($query) {
            $query->where('status', 'active')  // Ganti is_active dengan status
                  ->orderBy('created_at', 'desc'); // Gunakan created_at karena tidak ada kolom order
        }])
        ->get() // Hapus where is_active karena tidak ada di tabel education_levels
        ->map(function ($level) {
            return [
                'id' => $level->id,
                'name' => $level->name,
                'code' => $level->code,
                'slug' => $level->slug,
                'description' => $level->description,
                'order' => $level->order ?? 0, // Tambahkan default value jika null
                'is_active' => true, // Default true karena tidak ada kolom is_active
                'study_programs' => $level->studyPrograms
            ];
        });
    }

    public function create(array $data): EducationLevel
    {
        $maxOrder = EducationLevel::max('order') ?? -1;
        
        return EducationLevel::create([
            'name' => $data['name'],
            'code' => $data['code'],
            'slug' => Str::slug($data['name']),
            'description' => $data['description'] ?? null,
            'order' => $maxOrder + 1,
            'is_active' => $data['is_active'] ?? true
        ]);
    }

    public function update(EducationLevel $educationLevel, array $data): EducationLevel
    {
        $data['slug'] = Str::slug($data['name']);
        $educationLevel->update($data);
        
        return $educationLevel->fresh(['studyPrograms']);
    }

    public function delete(EducationLevel $educationLevel): void
    {
        DB::transaction(function () use ($educationLevel) {
            // Cek apakah ada program studi yang terkait
            if ($educationLevel->studyPrograms()->exists()) {
                throw new \Exception('Tidak dapat menghapus jenjang pendidikan yang memiliki program studi');
            }
            
            $deletedOrder = $educationLevel->order;
            $educationLevel->delete();
            
            // Update order untuk level lainnya
            EducationLevel::where('order', '>', $deletedOrder)
                          ->update(['order' => DB::raw('`order` - 1')]);
        });
    }
}