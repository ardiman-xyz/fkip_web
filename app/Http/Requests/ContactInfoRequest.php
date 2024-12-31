<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactInfoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'phone' => 'required|string',
            'fax' => 'nullable|string',
            'address' => 'required|string',
            'latitude' => 'nullable|string',
            'longitude' => 'nullable|string',
            'google_maps_url' => 'nullable|url',
            'operating_hours' => 'required|array',
            'operating_hours.monday_friday' => 'required|string',
            'operating_hours.saturday' => 'nullable|string',
            'operating_hours.sunday' => 'nullable|string',
            'social_media' => 'required|array',
            'social_media.facebook' => 'nullable|url',
            'social_media.instagram' => 'nullable|url',
            'social_media.twitter' => 'nullable|url',
            'social_media.youtube' => 'nullable|url',
            'social_media.linkedin' => 'nullable|url',
            'department_contacts' => 'nullable|array',
            'department_contacts.*.name' => 'required|string',
            'department_contacts.*.phone' => 'required|string',
            'department_contacts.*.email' => 'required|email',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email harus diisi',
            'email.email' => 'Format email tidak valid',
            'phone.required' => 'Nomor telepon harus diisi',
            'address.required' => 'Alamat harus diisi',
            'operating_hours.monday_friday.required' => 'Jam operasional Senin-Jumat harus diisi',
            'social_media.facebook.url' => 'URL Facebook tidak valid',
            'social_media.instagram.url' => 'URL Instagram tidak valid',
            'social_media.twitter.url' => 'URL Twitter tidak valid',
            'social_media.youtube.url' => 'URL YouTube tidak valid',
            'social_media.linkedin.url' => 'URL LinkedIn tidak valid',
        ];
    }
}
