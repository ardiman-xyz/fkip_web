<?php

namespace App\Services;

use App\Models\ContactInfo;
use Illuminate\Container\Attributes\DB;

class ContactInfoService
{
   public function getFirst()
   {
       return ContactInfo::first();
   }

   public function updateOrCreate(array $data)
   {
        return ContactInfo::updateOrCreate(
            ['id' => 1], 
            [
                'email' => $data['email'],
                'phone' => $data['phone'],
                'fax' => $data['fax'],
                'address' => $data['address'],
                'latitude' => $data['latitude'],
                'longitude' => $data['longitude'],
                'google_maps_url' => $data['google_maps_url'],
                'operating_hours' => $data['operating_hours'],
                'social_media' => $data['social_media'],
                'department_contacts' => $data['department_contacts'] ?? [],
            ]
           );
   }
}