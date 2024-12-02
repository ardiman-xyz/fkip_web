<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_featured' => 'boolean',
        'publish_date' => 'date'
    ];

    public function translations()
    {
        return $this->hasMany(NewsTranslation::class);
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
        return $this->belongsToMany(Tag::class, 'news_tags');
    }

}
