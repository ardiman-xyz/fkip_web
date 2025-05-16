<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentOrganizationTranslation extends Model
{
     /**
     * Get the organization that the translation belongs to
     */
    public function organization(): BelongsTo
    {
        return $this->belongsTo(StudentOrganization::class, 'student_organization_id');
    }

    /**
     * Get the language that the translation belongs to
     */
    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
}
