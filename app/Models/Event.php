<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $casts = [
        'is_featured' => 'boolean',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_free' => 'boolean',
    ];


    public function getTypeTextAttribute()
    {
        return [
            'online' => 'Online Event',
            'offline' => 'Offline Event',
            'hybrid' => 'Hybrid Event'
        ][$this->type] ?? $this->type;
    }


    public function translations()
    {
        return $this->hasMany(EventTranslation::class);
    }

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'event_tags');
    }

}
