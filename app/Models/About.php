<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class About extends Model
{
    public function organizationStructure()
    {
        return $this->belongsTo(Media::class, 'organization_structure_id');
    }

    public function deanImage()
    {
        return $this->belongsTo(Media::class, 'dean_image_id');
    }

    public function accreditationCertificate()
    {
        return $this->belongsTo(Media::class, 'accreditation_certificate_id');
    }

    public function translations(): HasMany
    {
        return $this->hasMany(AboutTranslation::class);
    }
}
