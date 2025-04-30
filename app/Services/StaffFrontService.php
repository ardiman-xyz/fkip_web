<?php

namespace App\Services;

use App\Models\Staff;
use Illuminate\Support\Facades\DB;

class StaffFrontService
{
    /**
     * Get all staff for frontend display
     */
    public function getAllForDirectory()
    {
        $staffMembers = Staff::with(['translations', 'media'])
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->get();

        return $staffMembers->map(function ($staff) {
            return $this->formatStaffForDirectory($staff);
        })->toArray();
    }

    /**
     * Format staff data for directory listing
     */
    private function formatStaffForDirectory($staff)
    {
        $translations = $staff->translations->mapWithKeys(function($translation) {
            return [$translation->locale => [
                'full_name' => $translation->full_name,
                'position' => $translation->position ?? '',
            ]];
        })->toArray();

        return [
            'id' => $staff->id,
            'nip' => $staff->nip,
            'unit' => $staff->unit,
            'media' => $staff->media ? [
                'id' => $staff->media->id,
                'path' => $staff->media->path ?? $staff->media->url ?? null
            ] : null,
            'translations' => $translations,
        ];
    }
}