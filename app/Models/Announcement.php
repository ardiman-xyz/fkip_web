<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Announcement extends Model
{
    protected $fillable = [
        'announcement_category_id',
        'media_id',
        'user_id',
        'status',
        'priority',
        'is_featured',
        'is_pinned',
        'published_at',
        'expires_at',
        'view_count',
        'action'
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_pinned' => 'boolean',
        'published_at' => 'datetime',
        'expires_at' => 'datetime',
        'view_count' => 'integer',
        'action' => 'array'
    ];

    // Relations

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'announcement_tags');
    }


    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function views(): HasMany
    {
        return $this->hasMany(AnnouncementView::class);
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(AnnouncementAttachment::class);
    }

      /**
     * Get the translations for the announcement
     */
    public function translations(): HasMany
    {
        return $this->hasMany(AnnouncementTranslation::class);
    }

    

    // Helper methods
    public function getTranslation($languageCode = 'id')
    {
        return $this->translations()
            ->whereHas('language', fn($q) => $q->where('code', $languageCode))
            ->first();
    }

    public function isNew($days = 7): bool
    {
        return $this->published_at && $this->published_at->gte(now()->subDays($days));
    }

    public function isExpired(): bool
    {
        return $this->expires_at && $this->expires_at->lt(now());
    }

    public function incrementViewCount(): void
    {
        $this->increment('view_count');
    }

    public function hasAction(): bool
    {
        return !empty($this->action);
    }

    public function getActionType(): ?string
    {
        return $this->action['type'] ?? null;
    }

    public function getActionUrl(): ?string
    {
        return $this->action['url'] ?? null;
    }

    public function getActionLabel(): ?string
    {
        return $this->action['label'] ?? null;
    }
}
