<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserVerification extends Model
{
    protected $fillable = [
        'user_id',
        'last_verified_at',
        'next_verification_at',
        'verification_count',
        'remember_choice',
        'ip_address',
        'user_agent',
        'verification_type',
    ];

    protected $casts = [
        'last_verified_at' => 'datetime',
        'next_verification_at' => 'datetime',
        'remember_choice' => 'boolean',
    ];

    /**
     * Relationship with user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope for active verifications
     */
    public function scopeActive($query)
    {
        return $query->where('next_verification_at', '>', now());
    }

    /**
     * Scope for expired verifications
     */
    public function scopeExpired($query)
    {
        return $query->where('next_verification_at', '<=', now());
    }
}
