<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVisionMissionRequest extends FormRequest
{
   public function authorize(): bool
   {
       return true;
   }

   public function rules(): array
   {
       return [
           'id.vision' => [
               'required',
               'string',
               function ($attribute, $value, $fail) {
                   $stripped = strip_tags($value);
                   if (empty(trim($stripped))) {
                       $fail('Visi dalam Bahasa Indonesia tidak boleh kosong');
                   }
               },
           ],
           'id.mission' => [
               'required',
               'string',
               function ($attribute, $value, $fail) {
                   $stripped = strip_tags($value);
                   if (empty(trim($stripped))) {
                       $fail('Misi dalam Bahasa Indonesia tidak boleh kosong');
                   }
               },
           ],
           'en.vision' => [
               'nullable',
               'string',
               'required_with:en.mission',
           ],
           'en.mission' => [
               'nullable',
               'string',
               'required_with:en.vision',
           ],
       ];
   }

   public function messages(): array
   {
       return [
           'id.vision.required' => 'Visi dalam Bahasa Indonesia wajib diisi',
           'id.mission.required' => 'Misi dalam Bahasa Indonesia wajib diisi',
           'en.vision.required_with' => 'Visi dalam Bahasa Inggris harus diisi jika Misi diisi',
           'en.mission.required_with' => 'Misi dalam Bahasa Inggris harus diisi jika Visi diisi',
       ];
   }
}