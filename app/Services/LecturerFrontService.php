<?php

namespace App\Services;

use App\Models\Lecturer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LecturerFrontService
{
    /**
     * Get all lecturers for frontend display
     */
    public function getAllForDirectory()
    {
        $lecturers = Lecturer::with(['translations', 'media'])
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->get();

        return $lecturers->map(function ($lecturer) {
            return $this->formatLecturerForDirectory($lecturer);
        })->toArray();
    }

    /**
     * Get a specific lecturer by ID for detailed view
     */
    public function getDetailById($id)
    {
        $lecturer = Lecturer::with([
            'translations', 
            'media', 
            'contacts',
            'academicPosition.translations'
        ])->findOrFail($id);

        return $this->formatLecturerDetail($lecturer);
    }

    /**
     * Format lecturer data for directory listing
     */
    private function formatLecturerForDirectory($lecturer)
    {
        $translations = $lecturer->translations->mapWithKeys(function($translation) {
            return [$translation->locale => [
                'full_name' => $translation->full_name,
                'position' => $translation->position ?? '',
            ]];
        })->toArray();

        return [
            'id' => $lecturer->id,
            'nidn' => $lecturer->nidn,
            'nip' => $lecturer->nip,
            'media' => $lecturer->media ? [
                'id' => $lecturer->media->id,
                'path' => $lecturer->media->path ?? $lecturer->media->url ?? null
            ] : null,
            'translations' => $translations,
        ];
    }

    /**
     * Format lecturer data for detailed view
     */
    private function formatLecturerDetail($lecturer)
    {
        $translations = $lecturer->translations->mapWithKeys(function($translation) {
            // Format education history text into HTML list
            $educationHistory = $this->formatAsHtmlList($translation->education_history);
            
            // Format other list-style content
            $researchInterests = $this->formatAsHtmlList($translation->research_interests);
            $teachingExperience = $this->formatAsHtmlList($translation->teaching_experience);
            $publications = $this->formatAsHtmlList($translation->publications);
            $awards = $this->formatAsHtmlList($translation->awards);
            
            return [$translation->locale => [
                'locale' => $translation->locale,
                'full_name' => $translation->full_name,
                'academic_title' => $translation->academic_title,
                'place_of_birth' => $translation->place_of_birth,
                'date_of_birth' => $translation->date_of_birth,
                'biography' => $translation->bio,
                'education_history' => $educationHistory,
                'research_interests' => $researchInterests,
                'teaching_experience' => $teachingExperience,
                'publications' => $publications,
                'awards' => $awards
            ]];
        })->toArray();

        return [
            'id' => $lecturer->id,
            'nip' => $lecturer->nip,
            'nidn' => $lecturer->nidn,
            'academic_title' => $lecturer->academic_title,
            'google_scholar_id' => $lecturer->google_scholar_id,
            'scopus_id' => $lecturer->scopus_id,
            'sinta_id' => $lecturer->sinta_id,
            'media' => $lecturer->media ? [
                'id' => $lecturer->media->id,
                'path' => $lecturer->media->path ?? $lecturer->media->url ?? null
            ] : null,
            'translations' => $translations,
            'academic_position' => $lecturer->academicPosition ? [
                'id' => $lecturer->academicPosition->id,
                'translations' => $lecturer->academicPosition->translations->mapWithKeys(function($translation) {
                    return [$translation->locale => [
                        'name' => $translation->name,
                    ]];
                })->toArray(),
            ] : null,
            'contact' => $lecturer->contacts ? [
                'email' => $lecturer->contacts->email,
                'phone' => $lecturer->contacts->phone,
                'whatsapp' => $lecturer->contacts->whatsapp,
                'website' => $lecturer->contacts->website
            ] : null,
        ];
    }

    /**
     * Format text with semicolons as an HTML list
     * 
     * @param string|null $text
     * @return string|null
     */
    private function formatAsHtmlList($text)
    {
        if (empty($text)) {
            return null;
        }

        // Check if it's already HTML
        if (str_contains($text, '<ul>') || str_contains($text, '<ol>')) {
            return $text;
        }

        // Check if it contains semicolons
        if (str_contains($text, ';')) {
            $items = array_filter(array_map('trim', explode(';', $text)));
            
            if (count($items) > 0) {
                $html = "<ul>\n";
                foreach ($items as $item) {
                    if (!empty($item)) {
                        $html .= "    <li>" . e($item) . "</li>\n";
                    }
                }
                $html .= "</ul>";
                return $html;
            }
        }
        
        // If no semicolons or already HTML or empty after filtering, return as is
        return $text;
    }
}