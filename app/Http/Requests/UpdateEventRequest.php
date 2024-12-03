<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
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
            'is_featured' => 'required|boolean',
            'status' => 'required|in:draft,published',
            'type' => 'required|in:offline,online',
            
            'start_date' => 'required|date',
            'end_date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    $startDate = Carbon::parse(request('start_date'));
                    $endDate = Carbon::parse($value);
                    
                    // Check date
                    if ($endDate->format('Y-m-d') < $startDate->format('Y-m-d')) {
                        $fail('End date cannot be earlier than start date.');
                        return;
                    }
                    
                    // If same day, check time
                    if ($endDate->format('Y-m-d') === $startDate->format('Y-m-d')) {
                        if ($endDate->format('H:i') <= $startDate->format('H:i')) {
                            $fail('End time must be later than start time on the same day.');
                        }
                    }
                }
            ],
            
            'location' => 'nullable|string|max:255',
            'platform' => 'nullable|string|max:255',
            'meeting_url' => 'nullable|url',
            'registration_url' => 'nullable|url',
            'quota' => 'nullable|integer|min:1',
            'is_free' => 'required|boolean',
            'price' => 'nullable|required_if:is_free,false|numeric|min:0',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ];
    }
}
