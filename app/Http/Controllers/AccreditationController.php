<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAccreditationRequest;
use App\Http\Requests\UpdateAccreditationRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Accreditation;
use App\Services\AccreditationService;
use Illuminate\Http\Request;

class AccreditationController extends Controller
{
    public function __construct(
        protected AccreditationService $accreditationService
    ) {}


    public function getAll()
    {
        $data =  $this->accreditationService->getAccreditationsWithTranslations();

        return response()->json([
            'status' => true,
            'data' => $data
        ]);
      
    }

    public function store(StoreAccreditationRequest $request)
    {
        try {
            $accreditation = $this->accreditationService->store($request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menambah sertifikat akreditasi',
                'data' => $accreditation
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menambah sertifikat akreditasi'
            ], 500);
        }
    }

    public function update(UpdateAccreditationRequest $request, Accreditation $accreditation)
    {
        try {
            $accreditation = $this->accreditationService->update($accreditation, $request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Berhasil mengubah sertifikat akreditasi',
                'data' => $accreditation
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengubah sertifikat akreditasi'
            ], 500);
        }
    }

    public function destroy(Accreditation $accreditation)
    {
        try {
            $this->accreditationService->delete($accreditation);
            
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menghapus sertifikat akreditasi'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus sertifikat akreditasi'
            ], 500);
        }
    }


   
}
