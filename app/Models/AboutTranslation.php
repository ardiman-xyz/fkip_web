<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutTranslation extends Model
{
    public function about()
    {
        return $this->belongsTo(About::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
