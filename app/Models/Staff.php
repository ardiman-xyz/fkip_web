<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    public function translations()
    {
        return $this->hasMany(StaffTranslation::class);
    }

    /**
     * Get the staff's media (profile picture).
     */
    public function media()
    {
        return $this->belongsTo(Media::class);
    }
}
