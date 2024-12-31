<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HistoryRequest extends FormRequest
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
            'is_active' => 'required|boolean',
            'translations' => 'required|array',
            'translations.id' => 'required|array',
            'translations.en' => 'required|array',
            'translations.id.language_id' => 'required|exists:languages,id',
            'translations.id.title' => 'required|string|max:255',
            'translations.id.content' => 'required|string',
            'translations.en.language_id' => 'required|exists:languages,id',
            'translations.en.title' => 'required|string|max:255',
            'translations.en.content' => 'required|string',
        ];
    }
 
    public function messages(): array
    {
        return [
            'translations.id.title.required' => 'Judul (ID) harus diisi',
            'translations.id.content.required' => 'Konten (ID) harus diisi',
            'translations.en.title.required' => 'Title (EN) is required',
            'translations.en.content.required' => 'Content (EN) is required',
        ];
    }
}
