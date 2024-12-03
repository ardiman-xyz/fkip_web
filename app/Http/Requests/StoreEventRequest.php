<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
           'type' => 'required|in:online,offline,hybrid',
           'start_date' => 'required|date',
            'end_date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    $startDate = \Carbon\Carbon::parse(request('start_date'));
                    $endDate = \Carbon\Carbon::parse($value);
                    
                    if ($endDate->format('Y-m-d') < $startDate->format('Y-m-d')) {
                        $fail('Tanggal selesai tidak boleh kurang dari tanggal mulai.');
                        return;
                    }
                    
                    if ($endDate->format('Y-m-d') === $startDate->format('Y-m-d')) {
                        $startTime = $startDate->format('H:i');
                        $endTime = $endDate->format('H:i');
                        
                        if ($endTime <= $startTime) {
                            $fail('Waktu selesai tidak boleh lebih awal dari waktu mulai.');
                        }
                    }
                }
            ],
           'location' => 'required_if:type,offline,hybrid',
           'platform' => 'required_if:type,online,hybrid',
           'meeting_url' => 'nullable|url',
           'registration_url' => 'nullable|url',
           'quota' => 'nullable|integer|min:1',
           'is_free' => 'boolean',
           'price' => 'required_if:is_free,false|nullable|numeric|min:0',
           'tags' => 'nullable|array',
           'tags.*' => 'exists:tags,id',
       ];
   }

   public function messages(): array
   {
       return [
           'id.title.required' => 'Title in Indonesian is required',
           'id.content.required' => 'Content in Indonesian is required',
           'end_date.after' => 'End date must be after start date',
           'location.required_if' => 'Location is required for offline/hybrid events',
           'platform.required_if' => 'Platform is required for online/hybrid events',
           'price.required_if' => 'Price is required for paid events',
       ];
   }
}
