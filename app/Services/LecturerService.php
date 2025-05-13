<?php

namespace App\Services;

use App\Models\Lecturer;
use App\Models\StudyProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
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
            'last_sync_at' => $lecturer->last_sync_at ?? null,
            'media' => $lecturer->media ? [
                'id' => $lecturer->media->id,
                'path' => $lecturer->media->path ?? $lecturer->media->url ?? null
            ] : null,
            'translations' => $lecturer->translations->mapWithKeys(function($translation) {
                return [$translation->locale => [
                    'locale' => $translation->locale,
                    'full_name' => $translation->full_name,
                    'first_title' => $translation->first_title ?? null, // Tambahkan first_title
                    'last_title' => $translation->last_title ?? null,   // Tambahkan last_title
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


    /**
     * Get all lecturers for a study program formatted for frontend
     * 
     * @param StudyProgram $studyProgram
     * @return array
     */
    public function getLecturers(StudyProgram $studyProgram): array
    {
        $lecturers = $studyProgram->lecturers()
            ->with(['academicPosition', 'media', 'translations'])
            ->get()
            ->map(function ($lecturer) {
                return $this->formatLecturerForResponse($lecturer);
            });
        
        return $lecturers->toArray();
    }

    

     /**
     * Format lecturer data to match frontend interface
     * 
     * @param Lecturer $lecturer
     * @return array
     */
    private function formatLecturerForResponse($lecturer): array
    {
        return [
            'id' => $lecturer->id,
            'name' => $lecturer->translations->where('locale', 'id')->first()->full_name ?? '',
            'nip' => $lecturer->nip,
            'nidn' => $lecturer->nidn,
            'position' => $lecturer->academicPosition?->name,
            'education' => $lecturer->translations->where('locale', 'id')->first()->education_history ?? '',
            'photo' => $lecturer->media ? ($lecturer->media->path ?? $lecturer->media->url ?? null) : null,
            'pivot' => [
                'role' => $lecturer->pivot->role,
                'is_active' => (bool)$lecturer->pivot->is_active
            ]
        ];
    }



    public function previewFromExternalApi()
    {
        try {
            $response = Http::get('https://simpeg.umkendari.ac.id/api/pegawai/fakultas/15');
            
            if ($response->successful()) {
                $pegawaiData = $response->json();
                $previewData = [];
                
                // Siapkan data untuk preview
                if (isset($pegawaiData['data']) && is_array($pegawaiData['data'])) {
                    foreach ($pegawaiData['data'] as $pegawai) {
                        // Cek apakah dosen sudah ada berdasarkan Employee_Id
                        $existingLecturer = DB::table('lecturers')
                            ->where('nip', $pegawai['detail_pegawai']['Employee_Id'])
                            ->first();
                        
                        // Jika tidak ditemukan berdasarkan Employee_Id, coba cari berdasarkan email
                        if (!$existingLecturer && !empty($pegawai['detail_pegawai']['Email_Corporate'])) {
                            $existingContact = DB::table('lecturer_contacts')
                                ->where('email', $pegawai['detail_pegawai']['Email_Corporate'])
                                ->first();
                                
                            if ($existingContact) {
                                $existingLecturer = DB::table('lecturers')
                                    ->where('id', $existingContact->lecturer_id)
                                    ->first();
                            }
                        }
                        
                        // Jika masih belum ditemukan, coba cari berdasarkan nama
                        if (!$existingLecturer) {
                            $existingTranslation = DB::table('lecturer_translations')
                                ->where('full_name', 'like', '%' . $pegawai['detail_pegawai']['Name'] . '%')
                                ->first();
                                
                            if ($existingTranslation) {
                                $existingLecturer = DB::table('lecturers')
                                    ->where('id', $existingTranslation->lecturer_id)
                                    ->first();
                            }
                        }
                        
                        // Siapkan data untuk preview
                        $previewData[] = [
                            'employee_id' => $pegawai['detail_pegawai']['Employee_Id'],
                            'nama' => $pegawai['detail_pegawai']['Name'],
                            'email' => $pegawai['detail_pegawai']['Email_Corporate'] ?? null,
                            'jenis_kelamin' => $pegawai['detail_pegawai']['Gender_Type'] ?? null,
                            'program_studi' => isset($pegawai['penempatan'][0]) ? ($pegawai['penempatan'][0]['Department_Name'] ?? null) : null,
                            'department_id' => isset($pegawai['penempatan'][0]) ? ($pegawai['penempatan'][0]['Department_Id'] ?? null) : null,
                            'status' => $existingLecturer ? 'update' : 'new'
                        ];
                    }
                }
                
                return response()->json([
                    'status' => true,
                    'data' => $previewData,
                    'total' => count($previewData)
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Gagal mengambil data: ' . $response->status()
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'trace' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
        }
    }

  
    /**
     * Sinkronisasi data dosen dari API eksternal
     */
    public function syncFromExternalApi(Request $request)
    {
        try {
            // Ambil daftar employee_id yang dipilih dari request
            $employeeIds = $request->input('nidn_list', []);
            
            // Validasi input
            if (empty($employeeIds)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Tidak ada data dosen yang dipilih untuk disinkronkan'
                ], 400);
            }

            // Gunakan Http client untuk memanggil API eksternal dengan timeout yang ditingkatkan
            $response = Http::timeout(30)->get('https://simpeg.umkendari.ac.id/api/pegawai/fakultas/15');
            
            if ($response->successful()) {
                $pegawaiData = $response->json();
                $totalSync = 0;
                $results = [];
                
                // Sinkronisasi data dosen
                if (isset($pegawaiData['data']) && is_array($pegawaiData['data'])) {
                    // Mulai transaction untuk memastikan semua operasi database berhasil
                    DB::beginTransaction();
                    
                    foreach ($pegawaiData['data'] as $pegawai) {
                        // Hanya proses pegawai yang dipilih di frontend
                        if (!in_array($pegawai['detail_pegawai']['Employee_Id'], $employeeIds)) {
                            continue;
                        }

                        // Ambil nilai dari API
                        $name = $pegawai['detail_pegawai']['Name'] ?? '';
                        $firstName = $pegawai['detail_pegawai']['First_Title'] ?? null;
                        $lastName = $pegawai['detail_pegawai']['Last_Title'] ?? null;
                        
                        // Cari program studi dan buat jika belum ada
                        $studyProgramId = null;
                        if (!empty($pegawai['penempatan']) && isset($pegawai['penempatan'][0]['Department_Id'])) {
                            $departmentId = $pegawai['penempatan'][0]['Department_Id'];
                            $departmentName = $pegawai['penempatan'][0]['Department_Name'] ?? null;
                            $facultyId = $pegawai['penempatan'][0]['Faculty_Id'] ?? null;
                            $facultyName = $pegawai['penempatan'][0]['Faculty_Name'] ?? null;
                            
                            if ($departmentId && $departmentName) {
                                // Cek program studi yang sudah ada
                                $existingProgram = DB::table('study_programs')
                                    ->where('department_id', $departmentId)
                                    ->first();
                                    
                                if ($existingProgram) {
                                    $studyProgramId = $existingProgram->id;
                                    
                                    // Update program studi jika ada perubahan
                                    DB::table('study_programs')
                                        ->where('id', $studyProgramId)
                                        ->update([
                                            'name' => $departmentName,
                                            'faculty_id' => $facultyId,
                                            'faculty_name' => $facultyName,
                                            'updated_at' => now()
                                        ]);
                                } else {
                                    // Buat program studi baru
                                    $studyProgramId = DB::table('study_programs')->insertGetId([
                                        'department_id' => $departmentId,
                                        'name' => $departmentName,
                                        'faculty_id' => $facultyId,
                                        'faculty_name' => $facultyName,
                                        'status' => 'active',
                                        'created_at' => now(),
                                        'updated_at' => now()
                                    ]);
                                }
                            }
                        }
                        
                        // Cek apakah dosen sudah ada berdasarkan Employee_Id (yang digunakan sebagai NIP)
                        $existingLecturer = DB::table('lecturers')
                            ->where('nip', $pegawai['detail_pegawai']['Employee_Id'])
                            ->first();
                        
                        // Siapkan data lecturer
                        $lecturerData = [
                            'nip' => $pegawai['detail_pegawai']['Employee_Id'],
                            'nidn' => $pegawai['detail_pegawai']['Nidn'] ?? null,
                            'status' => 'active',
                            'study_program_id' => $studyProgramId,
                            'last_sync_at' => now()
                        ];
                        
                        // Format gelar akademik jika ada
                        $academicTitle = '';
                        if (!empty($firstName)) {
                            $academicTitle .= $firstName . ' ';
                        }
                        if (!empty($lastName)) {
                            $academicTitle .= $lastName;
                        }
                        $lecturerData['academic_title'] = trim($academicTitle);
                        
                        // Tambahkan updated_at jika kolom tersebut ada
                        if ($this->hasColumn('lecturers', 'updated_at')) {
                            $lecturerData['updated_at'] = now();
                        }
                        
                        // Simpan atau update data dosen
                        $lecturerId = null;
                        if ($existingLecturer) {
                            // Update dosen yang sudah ada
                            DB::table('lecturers')
                                ->where('id', $existingLecturer->id)
                                ->update($lecturerData);
                            $lecturerId = $existingLecturer->id;
                        } else {
                            // Buat dosen baru
                            $lecturerData['created_at'] = now();
                            $lecturerId = DB::table('lecturers')->insertGetId($lecturerData);
                        }
                        
                        if ($lecturerId) {
                            // Update atau buat data kontak
                            $contactData = [
                                'email' => $pegawai['detail_pegawai']['Email_Corporate'] ?? null,
                                'phone' => $pegawai['detail_pegawai']['Phone_Mobile'] ?? null,
                                'updated_at' => now()
                            ];
                            
                            $existingContact = DB::table('lecturer_contacts')
                                ->where('lecturer_id', $lecturerId)
                                ->first();
                            
                            if ($existingContact) {
                                DB::table('lecturer_contacts')
                                    ->where('id', $existingContact->id)
                                    ->update($contactData);
                            } else {
                                $contactData['lecturer_id'] = $lecturerId;
                                $contactData['created_at'] = now();
                                DB::table('lecturer_contacts')->insert($contactData);
                            }
                            
                            // Perbarui data translations - simpan hanya name di full_name
                            $translationData = [
                                'full_name' => $name, // Hanya simpan Name saja
                                'first_title' => $firstName,
                                'last_title' => $lastName,
                                'place_of_birth' => $pegawai['detail_pegawai']['Birth_Place'] ?? null,
                                'date_of_birth' => $pegawai['detail_pegawai']['Birth_Date'] 
                                    ? date('Y-m-d', strtotime($pegawai['detail_pegawai']['Birth_Date'])) 
                                    : null
                            ];
                            
                            $existingTranslation = DB::table('lecturer_translations')
                                ->where('lecturer_id', $lecturerId)
                                ->where('locale', 'id') // Menggunakan locale 'id' untuk Indonesia
                                ->first();
                            
                            if ($existingTranslation) {
                                DB::table('lecturer_translations')
                                    ->where('id', $existingTranslation->id)
                                    ->update($translationData);
                            } else {
                                $translationData['lecturer_id'] = $lecturerId;
                                $translationData['locale'] = 'id';
                                
                                // Cek apakah tabel memiliki kolom created_at
                                $hasCreatedAt = DB::getSchemaBuilder()->hasColumn('lecturer_translations', 'created_at');
                                if ($hasCreatedAt) {
                                    $translationData['created_at'] = now();
                                }
                                
                                DB::table('lecturer_translations')->insert($translationData);
                            }
                            
                            $totalSync++;
                            
                            // Generate nama lengkap untuk hasil logging
                            $fullName = trim(
                                ($firstName ? $firstName . ' ' : '') . 
                                $name . 
                                ($lastName ? ' ' . $lastName : '')
                            );
                            
                            // Tambahkan ke hasil untuk logging
                            $results[] = [
                                'employee_id' => $pegawai['detail_pegawai']['Employee_Id'],
                                'name' => $fullName, // Tampilkan nama lengkap dengan gelar di hasil
                                'status' => $existingLecturer ? 'updated' : 'created'
                            ];
                        }
                    }
                    
                    // Commit transaction jika semua operasi berhasil
                    DB::commit();
                    
                    return response()->json([
                        'status' => true,
                        'message' => 'Berhasil sinkronisasi ' . $totalSync . ' data dosen',
                        'total_sync' => $totalSync,
                        'results' => $results
                    ]);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Format data dari API tidak sesuai'
                    ], 500);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Gagal mengambil data: ' . $response->status()
                ], 500);
            }
        } catch (\Exception $e) {
            // Rollback transaction jika terjadi error
            if (DB::transactionLevel() > 0) {
                DB::rollBack();
            }
            
            return response()->json([
                'status' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'trace' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
        }
    }

    /**
    * @param string $table Nama tabel
    * @param string $column Nama kolom
    * @return bool
    */
    private function hasColumn($table, $column)
    {
        return DB::getSchemaBuilder()->hasColumn($table, $column);
    }

    


}