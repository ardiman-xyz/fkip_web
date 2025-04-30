<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStaffRequest;
use App\Http\Requests\UpdateStaffRequest;
use App\Models\Staff;
use App\Services\StaffService;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    public function __construct(
        protected StaffService $staffService
    ) {}

    public function index()
    {
        return inertia('Admin/AboutUs');
    }

    public function getData()
    {
        $data = $this->staffService->getAll();

        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }

    public function store(StoreStaffRequest $request)
    {
        try {
            $staff = $this->staffService->create($request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menambah tenaga kependidikan',
                'data' => $staff
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menambah tenaga kependidikan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateStaffRequest $request, Staff $staff)
    {
        try {
            $staff = $this->staffService->update($staff, $request->validated());
            
            return response()->json([
                'status' => true,
                'message' => 'Berhasil mengubah tenaga kependidikan',
                'data' => $staff
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengubah tenaga kependidikan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Staff $staff)
    {
        try {
            $result = $this->staffService->delete($staff);
            
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menghapus tenaga kependidikan',
                'data' => $result['data']
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus tenaga kependidikan: ' . $e->getMessage()
            ], 500);
        }
    }
}