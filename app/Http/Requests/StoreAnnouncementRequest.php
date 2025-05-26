<?php

// File: app/Http/Requests/StoreAnnouncementRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnnouncementRequest extends FormRequest
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
            // Common fields
            'status' => 'required|in:draft,published,archived',
            'priority' => 'required|in:low,normal,high,urgent',
            'is_featured' => 'boolean',
            'is_pinned' => 'boolean',
            'published_at' => 'nullable|date',
            'media_id' => 'nullable|exists:media,id',
            
            // Pinned period fields
            'pinned_start_date' => 'nullable|date|required_if:is_pinned,true',
            'pinned_end_date' => 'nullable|date|after:pinned_start_date|required_if:is_pinned,true',
            
            // Action fields
            'action' => 'nullable|array',
            'action.type' => 'required_with:action|in:download,view,register',
            'action.url' => 'required_with:action|url',
            'action.label' => 'nullable|string|max:100',
            
            // Translation fields
            'translations' => 'required|array',
            'translations.id' => 'required|array',
            'translations.id.title' => 'required|string|max:255',
            'translations.id.content' => 'nullable|string',
            'translations.id.excerpt' => 'nullable|string|max:500',
            
            'translations.en' => 'required|array',
            'translations.en.title' => 'required|string|max:255',
            'translations.en.content' => 'nullable|string',
            'translations.en.excerpt' => 'nullable|string|max:500',
            
            // Tags (optional)
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id'
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'translations.id.title.required' => 'Judul dalam bahasa Indonesia wajib diisi',
            'translations.en.title.required' => 'Judul dalam bahasa Inggris wajib diisi',
            'translations.id.title.max' => 'Judul bahasa Indonesia maksimal 255 karakter',
            'translations.en.title.max' => 'Judul bahasa Inggris maksimal 255 karakter',
            'translations.id.excerpt.max' => 'Ringkasan bahasa Indonesia maksimal 500 karakter',
            'translations.en.excerpt.max' => 'Ringkasan bahasa Inggris maksimal 500 karakter',
            'expires_at.after' => 'Tanggal kadaluarsa harus setelah tanggal publikasi',
            'action.url.url' => 'URL aksi harus berupa URL yang valid',
            'media_id.exists' => 'Media yang dipilih tidak valid',
            
            // Pinned validation messages
            'pinned_start_date.required_if' => 'Tanggal mulai pinned wajib diisi jika pengumuman di-pin',
            'pinned_end_date.required_if' => 'Tanggal berakhir pinned wajib diisi jika pengumuman di-pin',
            'pinned_end_date.after' => 'Tanggal berakhir pinned harus setelah tanggal mulai',
        ];
    }
}