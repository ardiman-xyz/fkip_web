<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
           'email_verified_at' => 'datetime',
            'last_verified_at' => 'datetime',
            'verification_required_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

     /**
     * Relationship with user verifications
     */
    public function verifications()
    {
        return $this->hasMany(UserVerification::class);
    }

    /**
     * Relationship with verification logs
     */
    public function verificationLogs()
    {
        return $this->hasMany(UserVerificationLog::class);
    }

    /**
     * Get the latest verification record
     */
    public function latestVerification()
    {
        return $this->hasOne(UserVerification::class)->latest();
    }

    /**
     * Check if user needs re-authentication
     */
    public function needsReauth(): bool
    {
        if (!$this->last_verified_at) {
            return true;
        }

        $requiredAt = $this->verification_required_at 
            ? $this->verification_required_at 
            : $this->last_verified_at->addDays(30);

        return Carbon::now()->gt($requiredAt);
    }

    /**
     * Mark user as verified
     */
    public function markAsVerified(bool $rememberChoice = false, array $metadata = []): void
    {
        $now = Carbon::now();
        $verifiedUntil = $rememberChoice ? $now->copy()->addDays(90) : $now->copy()->addDays(30);
        
        // Update user table
        $this->update([
            'last_verified_at' => $now,
            'verification_required_at' => $verifiedUntil,
            'verification_count' => $this->verification_count + 1,
        ]);

        // Create verification record
        $this->verifications()->create([
            'last_verified_at' => $now,
            'next_verification_at' => $verifiedUntil,
            'verification_count' => $this->verification_count,
            'remember_choice' => $rememberChoice,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'verification_type' => 'manual',
        ]);

        // Log the verification
        $this->logVerification('verification_success', $metadata + [
            'remember_choice' => $rememberChoice,
            'verified_until' => $verifiedUntil,
        ]);
    }

    /**
     * Log verification activity
     */
    public function logVerification(string $action, array $metadata = []): void
    {
        $this->verificationLogs()->create([
            'action' => $action,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'remember_choice' => $metadata['remember_choice'] ?? false,
            'metadata' => $metadata,
            'session_id' => session()->getId(),
            'verified_until' => $metadata['verified_until'] ?? null,
        ]);
    }

    /**
     * Get days until next verification
     */
    public function getDaysUntilVerificationAttribute(): int
    {
        if (!$this->verification_required_at) {
            return 0;
        }

        return Carbon::now()->diffInDays($this->verification_required_at, false);
    }

    /**
     * Check if verification is due soon (within 7 days)
     */
    public function isVerificationDueSoon(): bool
    {
        return $this->getDaysUntilVerificationAttribute() <= 7 && $this->getDaysUntilVerificationAttribute() > 0;
    }
}
