<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEducationLevelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:10', 'unique:education_levels,code'],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean']
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama jenjang pendidikan harus diisi',
            'code.required' => 'Kode jenjang pendidikan harus diisi',
            'code.unique' => 'Kode jenjang pendidikan sudah digunakan',
            'code.max' => 'Kode maksimal 10 karakter'
        ];
    }
}
