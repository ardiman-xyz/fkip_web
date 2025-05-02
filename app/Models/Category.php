<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $table = "categories";
    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function translations(): HasMany
    {
        return $this->hasMany(CategoryTranslation::class);
    }

    public function translation($languageCode = null)
    {
        $languageCode = $languageCode ?? app()->getLocale();
        
        return $this->translations()
            ->whereHas('language', fn($q) => $q->where('code', $languageCode))
            ->first();
    }

    public function news()
    {
        return $this->hasMany(News::class);
    }

}
