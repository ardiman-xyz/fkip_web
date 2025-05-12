<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Lecturer extends Model
{
    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'media_id');
    }

    /**
     * Get the translations for the lecturer
     */
    public function translations(): HasMany
    {
        return $this->hasMany(LecturerTranslation::class);
    }

    /**
     * Get the contact information for the lecturer
     */
    public function contacts(): HasOne
    {
        return $this->hasOne(LecturerContact::class);
    }

    /**
     * Get the expertise areas for the lecturer
     */
    public function expertise(): BelongsToMany
    {
        return $this->belongsToMany(ExpertiseArea::class, 'lecturer_expertise', 'lecturer_id', 'expertise_area_id');
    }

    /**
     * Get the research interests for the lecturer
     */
    public function researchInterests(): BelongsToMany
    {
        return $this->belongsToMany(ResearchInterest::class, 'lecturer_research_interests', 'lecturer_id', 'research_interest_id');
    }

    /**
     * Get the social media accounts for the lecturer
     */
    public function socialMedia(): HasMany
    {
        return $this->hasMany(LecturerSocialMedia::class);
    }

    /**
     * Get the academic position for the lecturer
     */
    public function academicPosition(): BelongsTo
    {
        return $this->belongsTo(AcademicPosition::class, 'academic_position_id');
    }


    public function studyPrograms(): BelongsToMany
    {
        return $this->belongsToMany(StudyProgram::class, 'study_program_lecturers')
                    ->withPivot('role', 'is_active')
                    ->withTimestamps();
    }

}
