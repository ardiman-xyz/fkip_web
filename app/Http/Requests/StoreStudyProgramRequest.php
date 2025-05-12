<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudyProgramRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'department_id' => ['required', 'exists:education_levels,id'],
            'name' => ['required', 'string', 'max:255'],
            'program_code' => ['nullable', 'string', 'max:20'],
            'faculty_id' => ['nullable', 'integer'],
            'faculty_name' => ['nullable', 'string'],
            'status' => ['nullable', 'in:active,inactive']
        ];


        return $rules;
    }

    public function messages(): array
    {
        return [
            'department_id.required' => 'Jenjang pendidikan harus dipilih',
            'department_id.exists' => 'Jenjang pendidikan tidak valid',
            'name.required' => 'Nama program studi harus diisi',
            'program_code.unique' => 'Kode program studi sudah digunakan',
        ];
    }
}
