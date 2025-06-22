<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVerificationLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'action',
        'ip_address',
        'user_agent',
        'remember_choice',
        'metadata',
        'session_id',
        'verified_until',
    ];

    protected $casts = [
        'remember_choice' => 'boolean',
        'metadata' => 'array',
        'verified_until' => 'datetime',
    ];

    /**
     * Relationship with user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope for specific actions
     */
    public function scopeAction($query, string $action)
    {
        return $query->where('action', $action);
    }

    /**
     * Scope for recent logs
     */
    public function scopeRecent($query, int $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Scope for successful verifications
     */
    public function scopeSuccessful($query)
    {
        return $query->where('action', 'verification_success');
    }

    /**
     * Scope for failed verifications
     */
    public function scopeFailed($query)
    {
        return $query->where('action', 'verification_failed');
    }
}
