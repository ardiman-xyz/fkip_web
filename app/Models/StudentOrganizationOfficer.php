<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentOrganizationOfficer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'student_organization_id',
        'name',
        'position',
        'image_id',
        'period',
        'is_active',
        'order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the organization that owns the officer.
     */
    public function organization()
    {
        return $this->belongsTo(StudentOrganization::class, 'student_organization_id');
    }

    /**
     * Get the image media.
     */
    public function image()
    {
        return $this->belongsTo(Media::class, 'image_id');
    }
}