<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Scholarship extends Model
{
    protected $fillable = [
        'name',
        'description',
        'provider',
        'amount',
        'requirements',
        'start_date',
        'end_date',
        'application_deadline',
        'quota',
        'contact_person',
        'contact_email',
        'contact_phone',
        'cover_image_id',
        'is_active',
        'is_featured',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
        'application_deadline' => 'date',
        'amount' => 'decimal:2',
        'quota' => 'integer',
    ];

    protected $appends = [
        'amount_formatted',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($scholarship) {
            if (empty($scholarship->slug)) {
                $scholarship->slug = Str::slug($scholarship->name);
            }
        });
    }

    /**
     * Get the cover image associated with the scholarship.
     */
    public function coverImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'cover_image_id');
    }

    /**
     * Get formatted amount.
     */
    public function getAmountFormattedAttribute()
    {
        if (!$this->amount) {
            return null;
        }

        return 'Rp ' . number_format($this->amount, 0, ',', '.');
    }

    /**
     * Scope a query to only include active scholarships.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include featured scholarships.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to only include upcoming scholarships.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('application_deadline', '>=', now());
    }
}