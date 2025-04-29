<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LecturerRequest extends FormRequest
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
            'is_active' => 'boolean',

            // Indonesia (wajib)
            'translations.id.language_id' => 'required|integer',
            'translations.id.full_name' => 'required|string|max:255',
            'translations.id.research_interests' => 'nullable|string',
            'translations.id.education_history' => 'nullable|string',
            'translations.id.biography' => 'nullable|string',

            // English (opsional)
            'translations.en.language_id' => 'required|integer',
            'translations.en.full_name' => 'nullable|string|max:255',
            'translations.en.research_interests' => 'nullable|string',
            'translations.en.education_history' => 'nullable|string',
            'translations.en.biography' => 'nullable|string',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'media_id' => 'foto',
            'nip' => 'NIP',
            'nidn' => 'NIDN',
            'email' => 'Email',
            'phone' => 'nomor telepon',
            'academic_title' => 'gelar akademik',
            'is_active' => 'status aktif',
            'translations.id.full_name' => 'nama lengkap',
            'translations.id.research_interests' => 'minat penelitian',
            'translations.id.education_history' => 'riwayat pendidikan',
            'translations.id.biography' => 'biografi',
            'translations.en.full_name' => 'nama lengkap (English)',
            'translations.en.research_interests' => 'minat penelitian (English)',
            'translations.en.education_history' => 'riwayat pendidikan (English)',
            'translations.en.biography' => 'biografi (English)',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.required' => 'Email harus diisi',
            'email.email' => 'Format email tidak valid',
            'translations.id.full_name.required' => 'Nama lengkap harus diisi',
        ];
    }
}