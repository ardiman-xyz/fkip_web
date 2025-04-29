<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ResearchInterest extends Model
{
      /**
     * The lecturers that belong to the research interest
     */
    public function lecturers(): BelongsToMany
    {
        return $this->belongsToMany(Lecturer::class, 'lecturer_research_interests', 'research_interest_id', 'lecturer_id');
    }
}
