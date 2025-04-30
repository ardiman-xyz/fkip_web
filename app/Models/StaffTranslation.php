<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffTranslation extends Model
{
    public $timestamps = false;


    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}
