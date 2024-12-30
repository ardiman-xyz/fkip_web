<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeaderRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'media_id' => 'nullable|exists:media,id',
            'nip' => 'nullable|string',
            'nidn' => 'nullable|string',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'academic_title' => 'nullable|string',
            'translations' => 'required|array',
            'translations.*.language_id' => 'required|exists:languages,id',
            'translations.*.full_name' => 'required|string|max:255',
            'translations.*.position' => 'required|string|max:255',
            'translations.*.education_history' => 'required|string',
            'translations.*.research_interests' => 'nullable|string',
            'translations.*.biography' => 'required|string',
        ];
    }
}
