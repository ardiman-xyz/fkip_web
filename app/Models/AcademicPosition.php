<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicPosition extends Model
{
    public function translations()
    {
        return $this->hasMany(AcademicPositionTranslation::class);
    }

    public function lecturers()
    {
        return $this->hasMany(Lecturer::class);
    }
}
