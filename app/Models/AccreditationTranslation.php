<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccreditationTranslation extends Model
{
    public function accreditation()
    {
        return $this->belongsTo(Accreditation::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
