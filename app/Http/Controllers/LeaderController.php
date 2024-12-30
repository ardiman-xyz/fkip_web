<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeaderRequest;
use App\Http\Requests\UpdateLeaderRequest;
use App\Models\Leader;
use App\Services\LeaderService;
use Illuminate\Http\Request;

class LeaderController extends Controller
{
    public function __construct(private LeaderService $leaderService) {}

    public function getData()
    {
        try {
            $leaders = $this->leaderService->getAll();
            
            return response()->json([
                'status' => true,
                'data' => $leaders
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memuat data'
            ], 500);
        }
    }

   
    public function store(StoreLeaderRequest $request) {
        try {
            $leader = $this->leaderService->create($request->validated());
            return response()->json([
                'message' => 'Data berhasil disimpan',
                'data' => $leader
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan data'
            ], 500);
        }
    }

  
    public function update(UpdateLeaderRequest $request, Leader $leader)
   {
       try {
           $leader = $this->leaderService->update($leader, $request->validated());
           
           return response()->json([
               'status' => true,
               'message' => 'Data berhasil diperbarui',
               'data' => $leader
           ]);
       } catch (\Exception $e) {
           return response()->json([
               'status' => false,
               'message' => 'Gagal memperbarui data'
           ], 500);
       }
   }

   
    public function destroy(Leader $leader)
    {
        try {
            $leader = $this->leaderService->delete($leader);
            
            return response()->json([
                'status' => true,
                'message' => 'Data berhasil dihapus',
                'data' => $leader
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus data'
            ], 500);
        }
    }
}
