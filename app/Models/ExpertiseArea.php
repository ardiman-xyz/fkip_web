<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ExpertiseArea extends Model
{
    public function lecturers(): BelongsToMany
    {
        return $this->belongsToMany(Lecturer::class, 'lecturer_expertise', 'expertise_area_id', 'lecturer_id');
    }
}
