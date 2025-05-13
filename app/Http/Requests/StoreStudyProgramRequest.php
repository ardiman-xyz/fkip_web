<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudyProgramRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'education_level_id' => ['required', 'exists:education_levels,id'],
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
            'name.required' => 'Nama program studi harus diisi',
            'name.string' => 'Nama program studi harus berupa teks',
            'name.max' => 'Nama program studi maksimal 255 karakter',
            'education_level_id.required' => 'Jenjang pendidikan harus dipilih',
            'education_level_id.exists' => 'Jenjang pendidikan tidak valid',
        ];
    }
}
