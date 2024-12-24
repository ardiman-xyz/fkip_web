<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateVisionMissionRequest;
use App\Services\AboutService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class AboutController extends Controller 
{
   protected $aboutService;

   public function __construct(AboutService $aboutService)
   {
       $this->aboutService = $aboutService;
   }

   public function index()
   {
       return Inertia::render("AboutUs/Index");
   }

   public function updateVisionMission(UpdateVisionMissionRequest $request)
   {
     
       try {
           $this->aboutService->updateVisionMission($request->validated());

           return response()->json([
               'status' => true,
               'message' => 'Visi & Misi berhasil diperbarui'
           ]);

       } catch (\Exception $e) {
           return response()->json([
               'status' => false,
               'message' => 'Gagal memperbarui Visi & Misi'
           ], 500);
       }
   }

   public function show()
   {
       try {
          
            $content = $this->aboutService->getVisiMisi();

           return response()->json([
               'status' => true,
               'data' => $content
           ]);

       } catch (\Exception $e) {
           return response()->json([
               'status' => false,
               'message' => 'Failed to fetch content'
           ], 500);
       }
   }


   public function getStructure()
   {
       try {
           $structure = $this->aboutService->getStructure();
           
           return response()->json([
               'status' => true,
               'data' => $structure
           ]);
       } catch (\Exception $e) {
           return response()->json([
               'status' => false,
               'message' => 'Gagal mengambil data struktur organisasi'
           ], 500);
       }
   }

   public function updateStructure(Request $request)
   {
       $request->validate([
           'organization_structure_id' => 'required|exists:media,id'
       ]);

       try {
           $this->aboutService->updateStructure($request->organization_structure_id);
           
           return response()->json([
               'status' => true,
               'message' => 'Berhasil memperbarui struktur organisasi'
           ]);
       } catch (\Exception $e) {
           return response()->json([
               'status' => false,
               'message' => 'Gagal memperbarui struktur organisasi'
           ], 500);
       }
   }
}

