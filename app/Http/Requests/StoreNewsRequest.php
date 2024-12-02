<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNewsRequest extends FormRequest
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
            'id.title' => 'required|string|max:255',
            'id.content' => 'required|string',
            'en.title' => 'nullable|string|max:255',
            'en.content' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'featured_image' => 'nullable|exists:media,id',
            'is_featured' => 'boolean',
            'status' => 'required|in:draft,published',
            'publish_date' => 'required|date',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id'
        ];
    }

    public function messages(): array
    {
        return [
            'id.title.required' => 'Judul dalam bahasa Indonesia wajib diisi',
            'id.content.required' => 'Konten dalam bahasa Indonesia wajib diisi',
            'category_id.required' => 'Kategori wajib dipilih',
        ];
    }
}
