<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Accreditation extends Model
{
    protected $casts = [
        'is_active' => 'boolean',
        'year' => 'integer'
    ];

    public function translations(): HasMany
    {
        return $this->hasMany(AccreditationTranslation::class);
    }

    public function media()
    {
        return $this->belongsTo(Media::class);
    }
}
