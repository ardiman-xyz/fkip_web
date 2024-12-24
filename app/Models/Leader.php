<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Leader extends Model
{
    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function translations()
    {
        return $this->hasMany(LeaderTranslation::class);
    }

    public function photo()
    {
        return $this->belongsTo(Media::class, 'photo_id');
    }
}
