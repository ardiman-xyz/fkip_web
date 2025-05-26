<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnnouncementTranslation extends Model
{

    protected $fillable = [
        'announcement_id',
        'language_id',
        'title',
        'slug',
        'content',
        'excerpt',
        'meta_data',
    ];

    protected $casts = [
        'meta_data' => 'json',
    ];

    /**
     * Get the announcement that owns the translation
     */
    public function announcement(): BelongsTo
    {
        return $this->belongsTo(Announcement::class);
    }

    /**
     * Get the language that owns the translation
     */
    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
}
