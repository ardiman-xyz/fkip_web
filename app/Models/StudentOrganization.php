<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class StudentOrganization extends Model
{
    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($organization) {
            if (empty($organization->slug)) {
                $organization->slug = Str::slug($organization->name);
            }
        });
    }

    /**
     * Get organization officers (pengurus)
     */
    public function officers(): HasMany
    {
        return $this->hasMany(StudentOrganizationOfficer::class);
    }

    /**
     * Get organization translations
     */
    public function translations(): HasMany
    {
        return $this->hasMany(StudentOrganizationTranslation::class);
    }

    /**
     * Scope a query to only include active organizations
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include featured organizations
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Get organization with translations
     */
    public function getWithTranslations()
    {
        return $this->with(['translations'])->get();
    }


    public function logo()
    {
        return $this->belongsTo(Media::class, 'logo_id');
    }
    
    /**
     * Get the cover image media.
     */
    public function coverImage()
    {
        return $this->belongsTo(Media::class, 'cover_image_id');
    }
}
