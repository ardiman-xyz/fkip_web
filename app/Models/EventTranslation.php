<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventTranslation extends Model
{

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
    
}
