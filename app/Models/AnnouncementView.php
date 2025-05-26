<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnnouncementView extends Model
{
    use HasFactory;

    protected $fillable = [
        'announcement_id',
        'ip_address',
        'user_agent',
        'user_id',
        'viewed_at',
    ];

    protected $casts = [
        'viewed_at' => 'datetime',
    ];

    // Disable default timestamps karena kita pakai viewed_at
    public $timestamps = false;

    /**
     * Get the announcement that owns the view
     */
    public function announcement(): BelongsTo
    {
        return $this->belongsTo(Announcement::class);
    }

    /**
     * Get the user that owns the view (if authenticated)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope for getting views by IP address
     */
    public function scopeByIp($query, string $ipAddress)
    {
        return $query->where('ip_address', $ipAddress);
    }

    /**
     * Scope for getting views by user
     */
    public function scopeByUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope for getting views within date range
     */
    public function scopeWithinDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('viewed_at', [$startDate, $endDate]);
    }

    /**
     * Scope for getting today's views
     */
    public function scopeToday($query)
    {
        return $query->whereDate('viewed_at', today());
    }

    /**
     * Scope for getting unique views (distinct by IP or user)
     */
    public function scopeUnique($query)
    {
        return $query->distinct(['ip_address', 'user_id']);
    }
}