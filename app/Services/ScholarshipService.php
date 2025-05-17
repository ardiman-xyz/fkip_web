<?php

namespace App\Services;

use App\Models\Scholarship;
use App\Models\Media;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ScholarshipService
{
    /**
     * Get all scholarships.
     */
    public function getAllScholarships()
    {
        return Scholarship::with(['coverImage'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get a single scholarship by ID.
     *
     * @param int $id
     * @return Scholarship
     */
    public function getScholarshipById($id)
    {
        return Scholarship::with(['coverImage'])->findOrFail($id);
    }

    /**
     * Create a new scholarship.
     *
     * @param array $data
     * @return Scholarship
     */
    public function createScholarship(array $data)
    {
        return DB::transaction(function () use ($data) {
            // Generate a slug if not provided
            if (!isset($data['slug']) || empty($data['slug'])) {
                $data['slug'] = Str::slug($data['name']);
                
                // Make sure the slug is unique
                $count = Scholarship::where('slug', $data['slug'])->count();
                if ($count > 0) {
                    $data['slug'] = $data['slug'] . '-' . ($count + 1);
                }
            }
            
            // Format dates
            foreach (['start_date', 'end_date', 'application_deadline'] as $dateField) {
                if (isset($data[$dateField]) && !empty($data[$dateField])) {
                    $data[$dateField] = Carbon::parse($data[$dateField])->format('Y-m-d');
                }
            }
            
            // Create the scholarship
            $scholarship = Scholarship::create([
                'name' => $data['name'],
                'slug' => $data['slug'],
                'description' => $data['description'] ?? null,
                'provider' => $data['provider'],
                'amount' => $data['amount'] ?? null,
                'requirements' => $data['requirements'] ?? null,
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'application_deadline' => $data['application_deadline'],
                'quota' => $data['quota'] ?? null,
                'contact_person' => $data['contact_person'] ?? null,
                'contact_email' => $data['contact_email'] ?? null,
                'contact_phone' => $data['contact_phone'] ?? null,
                'cover_image_id' => $data['cover_image_id'] ?? null,
                'is_active' => $data['is_active'] ?? true,
                'is_featured' => $data['is_featured'] ?? false,
            ]);
            
            return $scholarship->fresh(['coverImage']);
        });
    }

    /**
     * Update an existing scholarship.
     *
     * @param Scholarship $scholarship
     * @param array $data
     * @return Scholarship
     */
    public function updateScholarship(Scholarship $scholarship, array $data)
    {
        return DB::transaction(function () use ($scholarship, $data) {
            // Daftar kolom yang valid di tabel scholarships
            $validColumns = [
                'name', 'slug', 'description', 'provider', 'amount', 'requirements',
                'start_date', 'end_date', 'application_deadline', 'quota',
                'contact_person', 'contact_email', 'contact_phone',
                'cover_image_id', 'is_active', 'is_featured'
            ];
            
            // Buat array data baru yang hanya berisi kolom valid
            $cleanData = [];
            foreach ($validColumns as $column) {
                if (array_key_exists($column, $data)) {
                    $cleanData[$column] = $data[$column];
                }
            }
            
            // Jika cover_image ada dan berupa array, ekstrak ID-nya
            if (isset($data['cover_image']) && is_array($data['cover_image'])) {
                $cleanData['cover_image_id'] = $data['cover_image']['id'] ?? null;
            }
            
            // Update the slug if name is changed
            if (isset($cleanData['name']) && $cleanData['name'] !== $scholarship->name && (!isset($cleanData['slug']) || empty($cleanData['slug']))) {
                $cleanData['slug'] = Str::slug($cleanData['name']);
                
                // Make sure the slug is unique
                $count = Scholarship::where('slug', $cleanData['slug'])
                    ->where('id', '!=', $scholarship->id)
                    ->count();
                if ($count > 0) {
                    $cleanData['slug'] = $cleanData['slug'] . '-' . ($count + 1);
                }
            }
            
            // Format dates
            foreach (['start_date', 'end_date', 'application_deadline'] as $dateField) {
                if (isset($cleanData[$dateField]) && !empty($cleanData[$dateField])) {
                    $cleanData[$dateField] = Carbon::parse($cleanData[$dateField])->format('Y-m-d');
                }
            }
            
            // Update the scholarship attributes dengan data yang sudah dibersihkan
            $scholarship->update($cleanData);
            
            return $scholarship->fresh(['coverImage']);
        });
    }

    /**
     * Delete a scholarship.
     *
     * @param Scholarship $scholarship
     * @return bool
     */
    public function deleteScholarship(Scholarship $scholarship)
    {
        return DB::transaction(function () use ($scholarship) {
            return $scholarship->delete();
        });
    }

    /**
     * Get active scholarships for frontend.
     *
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getActiveScholarships($limit = null)
    {
        $query = Scholarship::with(['coverImage'])
            ->active()
            ->upcoming()
            ->orderBy('is_featured', 'desc')
            ->orderBy('application_deadline', 'asc');
        
        if ($limit) {
            $query->limit($limit);
        }
        
        return $query->get();
    }

    /**
     * Get featured scholarships.
     *
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getFeaturedScholarships($limit = 5)
    {
        return Scholarship::with(['coverImage'])
            ->active()
            ->featured()
            ->upcoming()
            ->orderBy('application_deadline', 'asc')
            ->limit($limit)
            ->get();
    }
}