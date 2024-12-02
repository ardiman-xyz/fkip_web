<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsTranslation extends Model
{
    protected $guarded = [];

    public function news()
    {
        return $this->belongsTo(News::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
