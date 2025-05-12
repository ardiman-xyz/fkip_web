<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudyProgramDescriptionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Sesuaikan dengan logika otorisasi aplikasi Anda
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'required|string',
            'accreditation' => 'nullable|string|max:255',
            'accreditation_date' => 'nullable|date'
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'description.required' => 'Deskripsi program studi wajib diisi',
            'accreditation.max' => 'Akreditasi maksimal 255 karakter',
            'accreditation_date.date' => 'Format tanggal akreditasi tidak valid',
        ];
    }
}
