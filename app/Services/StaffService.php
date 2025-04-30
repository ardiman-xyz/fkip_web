<?php

namespace App\Services;

use App\Models\Staff;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class StaffService
{
    /**
     * Memeriksa apakah tabel ada di database
     */
    private function tableExists($table)
    {
        return Schema::hasTable($table);
    }
   
    /**
     * Mendapatkan semua staf dengan relasi yang diperlukan
     */
    public function getAll() 
    {
        $staffMembers = Staff::with(['media', 'translations'])
            ->orderBy('created_at', 'desc') 
            ->get();

        return $staffMembers->map(function ($staff) {
            return $this->formatStaffResponse($staff);
        })->toArray();
    }

    /**
     * Membuat staf baru
     */
    public function create(array $data) 
    {
        DB::beginTransaction();
        try {
            // Buat staff
            $staff = Staff::create([
                'nip' => $data['nip'] ?? null,
                'unit' => $data['unit'] ?? null,
                'media_id' => $data['media_id'] ?? null,
                'status' => $data['status'] ?? 'active',
            ]);

            // Simpan terjemahan Indonesia (wajib)
            $staff->translations()->create([
                'locale' => 'id',
                'full_name' => $data['translations']['id']['full_name'],
                'position' => $data['translations']['id']['position'] ?? null,
            ]);

            // Simpan terjemahan Inggris (opsional)
            if (isset($data['translations']['en'])) {
                $staff->translations()->create([
                    'locale' => 'en',
                    'full_name' => $data['translations']['en']['full_name'] ?? $data['translations']['id']['full_name'],
                    'position' => $data['translations']['en']['position'] ?? $data['translations']['id']['position'] ?? null,
                ]);
            }

            // Load relasi yang tersedia
            $staff->load(['media', 'translations']);

            DB::commit();
            
            // Format data untuk respons
            return $this->formatStaffResponse($staff);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Mengupdate data staf
     */
    public function update(Staff $staff, array $data)
    {
        DB::beginTransaction();
        try {
            $updates = [
                'nip' => $data['nip'] ?? null,
                'unit' => $data['unit'] ?? null,
                'media_id' => $data['media_id'] ?? null,
                'status' => $data['status'] ?? 'active',
            ];

            $staff->update($updates);

            // Update terjemahan Indonesia
            $staff->translations()
                ->where('locale', 'id')
                ->update([
                    'full_name' => $data['translations']['id']['full_name'],
                    'position' => $data['translations']['id']['position'] ?? null,
                ]);

            // Update atau buat terjemahan Inggris
            if (isset($data['translations']['en'])) {
                $englishTranslation = $staff->translations()->where('locale', 'en')->first();
                
                if ($englishTranslation) {
                    $englishTranslation->update([
                        'full_name' => $data['translations']['en']['full_name'] ?? $data['translations']['id']['full_name'],
                        'position' => $data['translations']['en']['position'] ?? $data['translations']['id']['position'] ?? null,
                    ]);
                } else {
                    $staff->translations()->create([
                        'locale' => 'en',
                        'full_name' => $data['translations']['en']['full_name'] ?? $data['translations']['id']['full_name'],
                        'position' => $data['translations']['en']['position'] ?? $data['translations']['id']['position'] ?? null,
                    ]);
                }
            }

            // Load relasi yang tersedia
            $staff->load(['media', 'translations']);

            DB::commit();
            
            return $this->formatStaffResponse($staff);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Menghapus data staf
     */
    public function delete(Staff $staff, bool $forceDelete = false)
    {
        DB::beginTransaction();
        try {
            // Simpan data staf sebelum dihapus untuk respons
            $staffId = $staff->id;
            $staffData = $this->formatStaffResponse($staff);
            
            // Hapus data terkait jika diperlukan
            if ($forceDelete) {
                // Hapus terjemahan
                $staff->translations()->delete();
                
                // Hapus staf secara permanen
                $staff->forceDelete();
            } else {
                // Soft delete
                $staff->delete();
            }
            
            DB::commit();
            
            return [
                'success' => true,
                'message' => 'Tenaga kependidikan berhasil dihapus',
                'id' => $staffId,
                'deleted_at' => now(),
                'data' => $staffData,
                'permanent' => $forceDelete
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Format data staf untuk respons
     */
    private function formatStaffResponse($staff)
    {
        $translations = $staff->translations->mapWithKeys(function($translation) {
            return [$translation->locale => [
                'locale' => $translation->locale,
                'full_name' => $translation->full_name,
                'position' => $translation->position,
            ]];
        })->toArray();

        return [
            'id' => $staff->id,
            'nip' => $staff->nip,
            'unit' => $staff->unit,
            'is_active' => $staff->status === 'active',
            'media_id' => $staff->media_id,
            'created_at' => $staff->created_at,
            'updated_at' => $staff->updated_at,
            'media' => $staff->media ? [
                'id' => $staff->media->id,
                'path' => $staff->media->path ?? $staff->media->url ?? null
            ] : null,
            'translations' => $translations,
        ];
    }
}