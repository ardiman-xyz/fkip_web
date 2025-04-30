<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStaffRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'nip' => 'nullable|string|max:30',
            'unit' => 'nullable|string|max:100',
            'status' => 'nullable|string|in:active,inactive',
            'media_id' => 'nullable|exists:media,id',
            'translations' => 'required|array',
            'translations.id' => 'required|array',
            'translations.id.full_name' => 'required|string|max:100',
            'translations.id.position' => 'nullable|string|max:100',
            'translations.en' => 'nullable|array',
            'translations.en.full_name' => 'nullable|string|max:100',
            'translations.en.position' => 'nullable|string|max:100',
        ];
    }
}