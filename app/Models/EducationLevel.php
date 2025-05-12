<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EducationLevel extends Model
{
    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer'
    ];

    /**
     * Get the study programs for the education level.
     */
    public function studyPrograms(): HasMany
    {
        return $this->hasMany(StudyProgram::class, 'education_level_id');
    }
}
