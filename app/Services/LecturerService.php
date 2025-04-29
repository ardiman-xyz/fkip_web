<?php

namespace App\Services;

use App\Models\Lecturer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class LecturerService {
    
    /**
     * Memeriksa apakah tabel ada di database
     */
    private function tableExists($table)
    {
        return Schema::hasTable($table);
    }
   
    /**
     * Mendapatkan semua dosen dengan relasi yang diperlukan
     */
    public function getAll() 
    {
        // Hanya muat relasi yang tersedia
        $with = $this->getAvailableRelations();
        
        $lecturers = Lecturer::with($with)
                            ->orderBy('created_at', 'desc') 
                            ->get();

        return $lecturers->map(function ($lecturer) {
            return $this->formatLecturerResponse($lecturer);
        });
    }

    /**
     * Membuat dosen baru
     */
    public function create(array $data) 
    {
        DB::beginTransaction();
        try {
            // Buat lecturer
            $lecturer = Lecturer::create([
                'nip' => $data['nip'],
                'nidn' => $data['nidn'],
                'academic_title' => $data['academic_title'] ?? null,
                'google_scholar_id' => $data['google_scholar_id'] ?? null,
                'scopus_id' => $data['scopus_id'] ?? null,
                'sinta_id' => $data['sinta_id'] ?? null,
                'status' => $data['status'] ?? 'active',
                'study_program_id' => $data['study_program_id'] ?? null,
                'academic_position_id' => $data['academic_position_id'] ?? null,
                'media_id' => $data['media_id'] ?? null,
            ]);

            // Simpan terjemahan Indonesia (wajib)
            $lecturer->translations()->create([
                'locale' => 'id',
                'full_name' => $data['translations']['id']['full_name'],
                'place_of_birth' => $data['translations']['id']['place_of_birth'] ?? null,
                'date_of_birth' => $data['translations']['id']['date_of_birth'] ?? null,
                'bio' => $data['translations']['id']['biography'] ?? null,
                'education_history' => $data['translations']['id']['education_history'] ?? null,
                'research_interests' => $data['translations']['id']['research_interests'] ?? null,
                'teaching_experience' => $data['translations']['id']['teaching_experience'] ?? null,
                'publications' => $data['translations']['id']['publications'] ?? null,
                'awards' => $data['translations']['id']['awards'] ?? null,
            ]);

            // Simpan terjemahan Inggris (opsional)
            if (isset($data['translations']['en'])) {
                $lecturer->translations()->create([
                    'locale' => 'en',
                    'full_name' => $data['translations']['en']['full_name'] ?? $data['translations']['id']['full_name'],
                    'place_of_birth' => $data['translations']['en']['place_of_birth'] ?? null,
                    'date_of_birth' => $data['translations']['en']['date_of_birth'] ?? null,
                    'bio' => $data['translations']['en']['biography'] ?? null,
                    'education_history' => $data['translations']['en']['education_history'] ?? null,
                    'research_interests' => $data['translations']['en']['research_interests'] ?? null,
                    'teaching_experience' => $data['translations']['en']['teaching_experience'] ?? null,
                    'publications' => $data['translations']['en']['publications'] ?? null,
                    'awards' => $data['translations']['en']['awards'] ?? null,
                ]);
            }

            // Simpan informasi kontak jika ada dan tabel tersedia
            if ($this->tableExists('lecturer_contacts')) {
                $lecturer->contacts()->create([
                    'email' => $data['email'] ?? null,
                    'phone' => $data['phone'] ?? null,
                    'whatsapp' => $data['whatsapp'] ?? null,
                    'website' => $data['website'] ?? null,
                ]);
            }

            // Simpan bidang keahlian jika ada dan tabel tersedia
            if (isset($data['expertise']) && is_array($data['expertise']) && 
                $this->tableExists('expertise_areas') && $this->tableExists('lecturer_expertise')) {
                $lecturer->expertise()->sync($data['expertise']);
            }

            // Simpan minat penelitian jika ada dan tabel tersedia
            if (isset($data['research_interests']) && is_array($data['research_interests']) && 
                $this->tableExists('research_interests') && $this->tableExists('lecturer_research_interests')) {
                $lecturer->researchInterests()->sync($data['research_interests']);
            }

            // Simpan media sosial jika ada dan tabel tersedia
            if (isset($data['social_media']) && is_array($data['social_media']) && 
                $this->tableExists('lecturer_social_media')) {
                foreach ($data['social_media'] as $socialMedia) {
                    $lecturer->socialMedia()->create([
                        'platform' => $socialMedia['platform'],
                        'url' => $socialMedia['url'],
                    ]);
                }
            }

            // Load relasi yang tersedia
            $lecturer->load($this->getAvailableRelations());

            DB::commit();
            
            // Format data untuk respons
            return $this->formatLecturerResponse($lecturer);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Mengupdate data dosen
     */
    public function update(Lecturer $lecturer, array $data)
    {
        DB::beginTransaction();
        try {
            $updates = [
                'nip' => $data['nip'],
                'nidn' => $data['nidn'],
                'academic_title' => $data['academic_title'] ?? null,
                'google_scholar_id' => $data['google_scholar_id'] ?? null,
                'scopus_id' => $data['scopus_id'] ?? null,
                'sinta_id' => $data['sinta_id'] ?? null,
                'status' => $data['status'] ?? 'active',
                'study_program_id' => $data['study_program_id'] ?? null,
                'academic_position_id' => $data['academic_position_id'] ?? null,
                'media_id' => $data['media_id'] ?? null,
            ];

            $lecturer->update($updates);

            // Update terjemahan Indonesia
            $lecturer->translations()
                ->where('locale', 'id')
                ->update([
                    'full_name' => $data['translations']['id']['full_name'],
                    'research_interests' => $data['translations']['id']['research_interests'] ?? null,
                    'education_history' => $data['translations']['id']['education_history'] ?? null,
                    'bio' => $data['translations']['id']['biography'] ?? null,
                ]);

            // Update atau buat terjemahan Inggris
            if (isset($data['translations']['en'])) {
                $englishTranslation = $lecturer->translations()->where('locale', 'en')->first();
                
                if ($englishTranslation) {
                    $englishTranslation->update([
                        'full_name' => $data['translations']['en']['full_name'] ?? $data['translations']['id']['full_name'],
                        'research_interests' => $data['translations']['en']['research_interests'] ?? null,
                        'education_history' => $data['translations']['en']['education_history'] ?? null,
                        'bio' => $data['translations']['en']['biography'] ?? null,
                    ]);
                } else {
                    $lecturer->translations()->create([
                        'locale' => 'en',
                        'full_name' => $data['translations']['en']['full_name'] ?? $data['translations']['id']['full_name'],
                        'research_interests' => $data['translations']['en']['research_interests'] ?? null,
                        'education_history' => $data['translations']['en']['education_history'] ?? null,
                        'bio' => $data['translations']['en']['biography'] ?? null,
                    ]);
                }
            }

            // Update kontak jika tabel tersedia
            if ($this->tableExists('lecturer_contacts')) {
                $lecturer->contacts()->updateOrCreate(
                    ['lecturer_id' => $lecturer->id],
                    [
                        'email' => $data['email'] ?? null,
                        'phone' => $data['phone'] ?? null,
                        'whatsapp' => $data['whatsapp'] ?? null,
                        'website' => $data['website'] ?? null,
                    ]
                );
            }

            // Load relasi yang tersedia
            $lecturer->load($this->getAvailableRelations());

            DB::commit();
            
            return $this->formatLecturerResponse($lecturer);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Menghapus data dosen
     *
     * @param Lecturer $lecturer Instance dari model dosen yang akan dihapus
     * @param bool $forceDelete True untuk menghapus permanen, false untuk soft delete
     * @return array Informasi tentang penghapusan
     */
    public function delete(Lecturer $lecturer, bool $forceDelete = false)
    {
        DB::beginTransaction();
        try {
            // Simpan data dosen sebelum dihapus untuk respons
            $lecturerId = $lecturer->id;
            $lecturerData = $this->formatLecturerResponse($lecturer);
            
            // Hapus data terkait jika diperlukan
            if ($forceDelete) {
                // Hapus terjemahan
                $lecturer->translations()->delete();
                
                // Hapus kontak jika tabel tersedia
                if ($this->tableExists('lecturer_contacts')) {
                    $lecturer->contacts()->delete();
                }
                
                // Hapus relasi keahlian jika tabel tersedia
                if ($this->tableExists('lecturer_expertise')) {
                    $lecturer->expertise()->detach();
                }
                
                // Hapus relasi minat penelitian jika tabel tersedia
                if ($this->tableExists('lecturer_research_interests')) {
                    $lecturer->researchInterests()->detach();
                }
                
                // Hapus media sosial jika tabel tersedia
                if ($this->tableExists('lecturer_social_media')) {
                    $lecturer->socialMedia()->delete();
                }
                
                // Hapus dosen secara permanen
                $lecturer->forceDelete();
            } else {
                // Soft delete
                $lecturer->delete();
            }
            
            DB::commit();
            
            return [
                'success' => true,
                'message' => 'Dosen berhasil dihapus',
                'id' => $lecturerId,
                'deleted_at' => now(),
                'data' => $lecturerData,
                'permanent' => $forceDelete
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Mendapatkan relasi yang tersedia untuk dimuat
     */
    private function getAvailableRelations()
    {
        $relations = ['media', 'translations'];
        
        if ($this->tableExists('lecturer_contacts')) {
            $relations[] = 'contacts';
        }
        
        return $relations;
    }

    /**
     * Format data dosen untuk respons
     */
    private function formatLecturerResponse($lecturer)
    {
        return [
            'id' => $lecturer->id,
            'nip' => $lecturer->nip,
            'nidn' => $lecturer->nidn,
            'academic_title' => $lecturer->academic_title,
            'google_scholar_id' => $lecturer->google_scholar_id ?? null,
            'scopus_id' => $lecturer->scopus_id ?? null,
            'sinta_id' => $lecturer->sinta_id ?? null,
            'is_active' => ($lecturer->status ?? 'active') === 'active',
            'study_program_id' => $lecturer->study_program_id ?? null,
            'academic_position_id' => $lecturer->academic_position_id ?? null,
            'media_id' => $lecturer->media_id,
            'created_at' => $lecturer->created_at,
            'updated_at' => $lecturer->updated_at,
            'media' => $lecturer->media ? [
                'id' => $lecturer->media->id,
                'path' => $lecturer->media->path ?? $lecturer->media->url ?? null
            ] : null,
            'translations' => $lecturer->translations->mapWithKeys(function($translation) {
                return [$translation->locale => [
                    'locale' => $translation->locale,
                    'full_name' => $translation->full_name,
                    'academic_title' => $translation->academic_title,
                    'place_of_birth' => $translation->place_of_birth,
                    'date_of_birth' => $translation->date_of_birth,
                    'biography' => $translation->bio,
                    'education_history' => $translation->education_history,
                    'research_interests' => $translation->research_interests,
                    'teaching_experience' => $translation->teaching_experience,
                    'publications' => $translation->publications,
                    'awards' => $translation->awards
                ]];
            })->toArray(),
            'contact' => isset($lecturer->contacts) ? [
                'email' => $lecturer->contacts->email,
                'phone' => $lecturer->contacts->phone,
                'whatsapp' => $lecturer->contacts->whatsapp ?? null,
                'website' => $lecturer->contacts->website ?? null
            ] : null,
            'expertise' => [],
            'research_interests' => [],
            'social_media' => []
        ];
    }
}