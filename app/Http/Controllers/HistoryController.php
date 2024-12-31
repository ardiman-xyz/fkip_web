<?php

namespace App\Http\Controllers;

use App\Http\Requests\HistoryRequest;
use App\Models\History;
use App\Services\HistoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
   public function __construct(private HistoryService $historyService)
   {}

   public function getData()
   {
      try {
          $history = $this->historyService->getFirst();
          
          return response()->json([
              'status' => true,
              'data' => $history
          ]);
      } catch (\Exception $e) {
          return response()->json([
              'status' => false,
              'message' => 'Gagal memuat data'
          ], 500);
      }
   }
   

   public function store(HistoryRequest $request)
   {
       try {
           $history = $this->historyService->create($request->validated());
           
           return response()->json([
               'status' => true,
               'message' => 'Data berhasil disimpan',
               'data' => $history
           ]);
       } catch (\Exception $e) {
           return response()->json([
               'status' => false,
               'message' => 'Gagal menyimpan data'
           ], 500);
       }
   }

   public function update(HistoryRequest $request, History $history)
   {
       try {
           $history = $this->historyService->update($history, $request->validated());
           
           return response()->json([
               'status' => true,
               'message' => 'Data berhasil diperbarui',
               'data' => $history
           ]);
       } catch (\Exception $e) {
           return response()->json([
               'status' => false,
               'message' => 'Gagal memperbarui data'
           ], 500);
       }
   }
}

