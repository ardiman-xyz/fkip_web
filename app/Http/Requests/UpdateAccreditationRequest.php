<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAccreditationRequest extends FormRequest
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
            'media_id' => 'required|exists:media,id',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'is_active' => 'boolean',
            'translations.id.title' => 'required|string|max:255',
            'translations.id.description' => 'required|string',
            'translations.en.title' => 'nullable|string|max:255',
            'translations.en.description' => 'nullable|string',
        ];
    }
}
