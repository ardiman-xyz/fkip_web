<?php

namespace App\Services;

use App\Models\StudentOrganization;
use App\Models\StudentOrganizationTranslation;
use App\Models\Media;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StudentOrganizationService
{
    /**
     * Get all organizations with their translations and media.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllOrganizations()
    {
        return StudentOrganization::with(['translations', 'logo', 'coverImage'])->orderBy('order', 'desc')->get();
    }
    
    /**
     * Get a single organization by ID.
     *
     * @param int $id
     * @return StudentOrganization
     */
    public function getOrganizationById($id)
    {
        return StudentOrganization::with(['translations', 'logo', 'coverImage', 'officers.image'])->findOrFail($id);
    }
    
    /**
     * Create a new organization.
     *
     * @param array $data
     * @return StudentOrganization
     */
    public function createOrganization(array $data)
    {
        return DB::transaction(function () use ($data) {
            // Generate a slug if not provided
            if (!isset($data['slug']) || empty($data['slug'])) {
                $data['slug'] = Str::slug($data['name']);
                
                // Make sure the slug is unique
                $slugCount = StudentOrganization::where('slug', $data['slug'])->count();
                if ($slugCount > 0) {
                    $data['slug'] = $data['slug'] . '-' . ($slugCount + 1);
                }
            }
            
            // Create the organization
            $organization = StudentOrganization::create([
                'name' => $data['name'],
                'slug' => $data['slug'],
                'description' => $data['description'] ?? null,
                'logo_id' => $data['logo_id'] ?? null,
                'cover_image_id' => $data['cover_image_id'] ?? null,
                'founding_year' => $data['founding_year'] ?? null,
                'email' => $data['email'] ?? null,
                'instagram' => $data['instagram'] ?? null,
                'is_active' => $data['is_active'] ?? true,
                'is_featured' => $data['is_featured'] ?? false,
                'order' => $this->getNextOrderNumber(),
            ]);
            
            // Create translations if provided
            if (isset($data['translations']) && is_array($data['translations'])) {
                foreach ($data['translations'] as $locale => $translation) {
                    StudentOrganizationTranslation::create([
                        'student_organization_id' => $organization->id,
                        'language_id' => $this->getLanguageId($locale),
                        'name' => $translation['name'] ?? $data['name'],
                        'description' => $translation['description'] ?? $data['description'] ?? null,
                        'vision' => $translation['vision'] ?? null,
                        'mission' => $translation['mission'] ?? null,
                    ]);
                }
            } else {
                // Create a default translation in Indonesian
                StudentOrganizationTranslation::create([
                    'student_organization_id' => $organization->id,
                    'language_id' => $this->getLanguageId('id'),
                    'name' => $data['name'],
                    'description' => $data['description'] ?? null,
                    'vision' => null,
                    'mission' => null,
                ]);
            }
            
            return $organization->fresh(['translations', 'logo', 'coverImage']);
        });
    }
    
    /**
     * Update an existing organization.
     *
     * @param StudentOrganization $organization
     * @param array $data
     * @return StudentOrganization
     */
    public function updateOrganization(StudentOrganization $organization, array $data)
    {
        return DB::transaction(function () use ($organization, $data) {
            // Update organization attributes
            $organization->update([
                'name' => $data['name'] ?? $organization->name,
                'description' => $data['description'] ?? $organization->description,
                'logo_id' => $data['logo_id'] ?? $organization->logo_id,
                'cover_image_id' => $data['cover_image_id'] ?? $organization->cover_image_id,
                'founding_year' => $data['founding_year'] ?? $organization->founding_year,
                'email' => $data['email'] ?? $organization->email,
                'instagram' => $data['instagram'] ?? $organization->instagram,
                'is_active' => $data['is_active'] ?? $organization->is_active,
                'is_featured' => $data['is_featured'] ?? $organization->is_featured,
            ]);
            
            // Update translations if provided
            if (isset($data['translations']) && is_array($data['translations'])) {
                foreach ($data['translations'] as $locale => $translation) {
                    $languageId = $this->getLanguageId($locale);
                    
                    // Find existing translation or create new one
                    $existingTranslation = StudentOrganizationTranslation::where('student_organization_id', $organization->id)
                        ->where('language_id', $languageId)
                        ->first();
                        
                    if ($existingTranslation) {
                        $existingTranslation->update([
                            'name' => $translation['name'] ?? $existingTranslation->name,
                            'description' => $translation['description'] ?? $existingTranslation->description,
                            'vision' => $translation['vision'] ?? $existingTranslation->vision,
                            'mission' => $translation['mission'] ?? $existingTranslation->mission,
                        ]);
                    } else {
                        StudentOrganizationTranslation::create([
                            'student_organization_id' => $organization->id,
                            'language_id' => $languageId,
                            'name' => $translation['name'] ?? $data['name'] ?? $organization->name,
                            'description' => $translation['description'] ?? $data['description'] ?? $organization->description,
                            'vision' => $translation['vision'] ?? null,
                            'mission' => $translation['mission'] ?? null,
                        ]);
                    }
                }
            }
            
            return $organization->fresh(['translations', 'logo', 'coverImage']);
        });
    }
    
    /**
     * Delete an organization.
     *
     * @param StudentOrganization $organization
     * @return bool
     */
    public function deleteOrganization(StudentOrganization $organization)
    {
        return DB::transaction(function () use ($organization) {
            // Delete related translations
            StudentOrganizationTranslation::where('student_organization_id', $organization->id)->delete();
            
            // Delete the organization
            return $organization->delete();
        });
    }
    
    /**
     * Get the next available order number for organizations.
     *
     * @return int
     */
    protected function getNextOrderNumber()
    {
        $maxOrder = StudentOrganization::max('order');
        return $maxOrder ? $maxOrder + 1 : 1;
    }
    
    /**
     * Get language ID by locale code.
     *
     * @param string $locale
     * @return int
     */
    protected function getLanguageId($locale)
    {
        // This should query your languages table
        // For now using a simple mapping
        $mapping = [
            'id' => 1,  // Indonesian
            'en' => 2,  // English
        ];
        
        return $mapping[$locale] ?? 1; // Default to Indonesian
    }
}