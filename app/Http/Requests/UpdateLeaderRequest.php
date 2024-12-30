<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLeaderRequest extends FormRequest
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
            'nip' => 'nullable|string|max:50',
            'nidn' => 'nullable|string|max:50',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'academic_title' => 'nullable|string|max:100',
            'translations' => 'required|array',
            'translations.id' => 'required|array',
            'translations.en' => 'required|array',
            'translations.id.language_id' => 'required|exists:languages,id',
            'translations.id.full_name' => 'required|string|max:255',
            'translations.id.position' => 'required|string|max:255',
            'translations.id.education_history' => 'required|string',
            'translations.id.research_interests' => 'nullable|string',
            'translations.id.biography' => 'required|string',
            'translations.en.language_id' => 'required|exists:languages,id',
            'translations.en.full_name' => 'required|string|max:255',
            'translations.en.position' => 'required|string|max:255',
            'translations.en.education_history' => 'required|string',
            'translations.en.research_interests' => 'nullable|string',
            'translations.en.biography' => 'required|string',
        ];
    }
 
    public function messages(): array
    {
        return [
            'email.required' => 'Email harus diisi',
            'email.email' => 'Format email tidak valid',
            'translations.id.full_name.required' => 'Nama lengkap (ID) harus diisi',
            'translations.id.position.required' => 'Jabatan (ID) harus diisi',
            'translations.id.education_history.required' => 'Riwayat pendidikan (ID) harus diisi',
            'translations.id.biography.required' => 'Biografi (ID) harus diisi',
            'translations.en.full_name.required' => 'Full name (EN) is required',
            'translations.en.position.required' => 'Position (EN) is required',
            'translations.en.education_history.required' => 'Education history (EN) is required',
            'translations.en.biography.required' => 'Biography (EN) is required',
        ];
    }
}
