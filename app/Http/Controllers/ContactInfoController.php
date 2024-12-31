<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactInfoRequest;
use App\Services\ContactInfoService;
use Illuminate\Http\Request;

class ContactInfoController extends Controller
{
    public function __construct(private ContactInfoService $contactInfoService)
    {}
 
    public function getData()
    {
        try {
            $data = $this->contactInfoService->getFirst();
            
            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memuat data'
            ], 500);
        }
    }
 
    public function store(ContactInfoRequest $request)
    {
        try {
            $data = $this->contactInfoService->updateOrCreate($request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Data berhasil disimpan',
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menyimpan data'
            ], 500);
        }
    }
}
