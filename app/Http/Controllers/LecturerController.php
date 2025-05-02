<?php

namespace App\Http\Controllers;

use App\Http\Requests\LecturerRequest;
use App\Models\Lecturer;
use App\Services\LecturerService;
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

    public function previewFromExternalApi()
    {
        try {
            // Gunakan Http client untuk memanggil API eksternal
            $response = Http::get('https://simpeg.umkendari.ac.id/api/pegawai/fakultas/15');
            
            if ($response->successful()) {
                $pegawaiData = $response->json();
                $previewData = [];
                
                // Siapkan data untuk preview
                if (isset($pegawaiData['data']) && is_array($pegawaiData['data'])) {
                    foreach ($pegawaiData['data'] as $pegawai) {
                        // Cek apakah dosen sudah ada berdasarkan email
                        $existingId = null;
                        
                        if (!empty($pegawai['Email_Corporate'])) {
                            $existingContact = DB::table('lecturer_contacts')
                                ->where('email', $pegawai['Email_Corporate'])
                                ->first();
                                
                            if ($existingContact) {
                                $existingId = $existingContact->lecturer_id;
                            }
                        }
                        
                        // Jika tidak ditemukan berdasarkan email, coba cari berdasarkan nama
                        if (!$existingId) {
                            $existingLecturer = DB::table('lecturers')
                                ->join('lecturer_translations', 'lecturers.id', '=', 'lecturer_translations.lecturer_id')
                                ->where('lecturer_translations.full_name', 'like', '%' . $pegawai['Name'] . '%')
                                ->first();
                                
                            if ($existingLecturer) {
                                $existingId = $existingLecturer->lecturer_id;
                            }
                        }
                        
                        $previewData[] = [
                            'employee_id' => $pegawai['Employee_Id'],
                            'nama' => $pegawai['Name'],
                            'email' => $pegawai['Email_Corporate'] ?? null,
                            'jenis_kelamin' => $pegawai['Gender_Type'] ?? null,
                            'program_studi' => $pegawai['Department']['Department_Name'] ?? null,
                            'department_id' => $pegawai['Department']['Department_Id'] ?? null,
                            'status' => $existingId ? 'update' : 'new'
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
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }



    /**
     * Sinkronisasi data dosen dari API eksternal
     */
    public function syncFromExternalApi(Request $request)
    {
        try {
            // Ambil daftar NIDN yang dipilih
            $nidnList = $request->input('nidn_list', []);
            
            // Gunakan Http client untuk memanggil API eksternal
            $response = Http::get('https://simpeg.umkendari.ac.id/api/pegawai/fakultas/15');
            
            if ($response->successful()) {
                $pegawaiData = $response->json();
                $totalSync = 0;
                
                // Lakukan pemrosesan data
                if (isset($pegawaiData['data']) && is_array($pegawaiData['data'])) {
                    foreach ($pegawaiData['data'] as $pegawai) {
                        // Lewati jika NIDN tidak ada dalam daftar yang dipilih
                        if (!empty($nidnList) && !in_array($pegawai['nidn'], $nidnList)) {
                            continue;
                        }
                        
                        // Cek apakah dosen sudah ada berdasarkan NIDN
                        $existingLecturer = DB::table('dosen')->where('NIDN', $pegawai['nidn'])->first();
                        
                        // Data untuk insert atau update
                        $lecturerData = [
                            'nama_dosen' => $pegawai['nama'],
                            'NIDN' => $pegawai['nidn'],
                            'email_dosen' => $pegawai['email'] ?? null,
                            'jenis_kelamin' => $pegawai['jenis_kelamin'] ?? null,
                            'status' => 'Aktif',
                            'updated_at' => now()
                        ];
                        
                        if ($existingLecturer) {
                            // Update jika sudah ada
                            DB::table('dosen')
                                ->where('id', $existingLecturer->id)
                                ->update($lecturerData);
                        } else {
                            // Insert jika belum ada
                            $lecturerData['created_at'] = now();
                            DB::table('dosen')->insert($lecturerData);
                        }
                        
                        $totalSync++;
                    }
                }
                
                return response()->json([
                    'status' => true,
                    'message' => 'Berhasil sinkronisasi ' . $totalSync . ' data dosen',
                    'total_sync' => $totalSync
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
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
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

}