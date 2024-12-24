<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaderTranslation extends Model
{
    public function leader()
    {
        return $this->belongsTo(Leader::class);
    }
}
