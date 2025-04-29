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

   public function getFirstHome()
   {
       $contact = ContactInfo::first();

       if (!$contact) return null;

       return [
           'id' => $contact->id,
           'email' => $contact->email,
           'phone' => $contact->phone,
           'fax' => $contact->fax,
           'address' => $contact->address,
           'latitude' => $contact->latitude,
           'longitude' => $contact->longitude,
           'google_maps_url' => $contact->google_maps_url,
           'social_media' => [
               'facebook' => $contact->social_media['facebook'] ?? null,
               'instagram' => $contact->social_media['instagram'] ?? null, 
               'twitter' => $contact->social_media['twitter'] ?? null,
               'youtube' => $contact->social_media['youtube'] ?? null,
               'linkedin' => $contact->social_media['linkedin'] ?? null,
           ],
           'operating_hours' => [
               'monday_friday' => $contact->operating_hours['monday_friday'],
               'saturday' => $contact->operating_hours['saturday'],
               'sunday' => $contact->operating_hours['sunday'],
           ],
           'department_contacts' => array_map(function($contact) {
               return [
                   'name' => $contact['name'],
                   'phone' => $contact['phone'],
                   'email' => $contact['email']
               ];
           }, $contact->department_contacts ?? [])
       ];
   }
}