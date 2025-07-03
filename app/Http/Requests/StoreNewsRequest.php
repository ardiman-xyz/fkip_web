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
            'is_featured' => 'nullable|boolean',
            'slider_image' => [
                'nullable',
                'required_if:is_featured,true',
                'array'
            ],
            'slider_image.id' => [
                'required_if:is_featured,true',
                'exists:media,id'
            ],
            'featured_expired_date' => [
                'nullable',
                'required_if:is_featured,true',
                'date',
                'after:today'
            ],
            'status' => 'required|in:draft,published',
            'publish_date' => 'required|date',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id'
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        // Konversi is_featured ke boolean dan default ke false
        $this->merge([
            'is_featured' => $this->boolean('is_featured', false)
        ]);

        // Jika is_featured false, set slider_image dan featured_expired_date ke null
        if (!$this->boolean('is_featured', false)) {
            $this->merge([
                'slider_image' => null,
                'featured_expired_date' => null
            ]);
        }
    }

    public function messages(): array
    {
        return [
            'id.title.required' => 'Judul dalam bahasa Indonesia wajib diisi',
            'id.content.required' => 'Konten dalam bahasa Indonesia wajib diisi',
            'category_id.required' => 'Kategori wajib dipilih',
            'slider_image.required_if' => 'Gambar slider wajib dipilih jika artikel featured',
            'slider_image.array' => 'Format gambar slider tidak valid',
            'featured_expired_date.required_if' => 'Tanggal expired wajib diisi jika artikel featured',
            'featured_expired_date.after' => 'Tanggal expired harus setelah hari ini',
            'featured_expired_date.date' => 'Format tanggal expired tidak valid'
        ];
    }
}
