<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicPositionTranslation extends Model
{
    public function academicPosition()
    {
        return $this->belongsTo(AcademicPosition::class);
    }
}
