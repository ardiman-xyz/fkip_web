<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
    protected $casts = [
        'operating_hours' => 'array',
        'social_media' => 'array',
        'department_contacts' => 'array'
    ];
}
