<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DefaultSlider extends Model
{
    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class);
    }
}
