<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StudyProgram extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'program_code',
        'department_id',
        'education_level_id',
        'faculty_id',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the education level that owns the study program.
     */
    public function educationLevel(): BelongsTo
    {
        return $this->belongsTo(EducationLevel::class);
    }

    /**
     * Get the faculty that owns the study program.
     */
    // public function faculty(): BelongsTo
    // {
    //     return $this->belongsTo(Faculty::class);
    // }

    /**
     * Get the department that owns the study program.
     */
    // public function department(): BelongsTo
    // {
    //     return $this->belongsTo(Department::class);
    // }

    /**
     * Get the description associated with the study program.
     */
    public function description(): HasOne
    {
        return $this->hasOne(StudyProgramDescription::class);
    }

    /**
     * Get the contact information associated with the study program.
     */
    public function contact(): HasOne
    {
        return $this->hasOne(StudyProgramContact::class);
    }

    /**
     * The lecturers that belong to the study program.
     */
    public function lecturers(): BelongsToMany
    {
        return $this->belongsToMany(Lecturer::class, 'study_program_lecturers')
                    ->withPivot('role', 'is_active')
                    ->withTimestamps();
    }
}