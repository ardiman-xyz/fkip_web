<?php

namespace App\Http\Controllers;

use App\Models\Scholarship;
use App\Services\ScholarshipService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ScholarshipController extends Controller
{
    protected $scholarshipService;

    /**
     * Create a new controller instance.
     *
     * @param ScholarshipService $scholarshipService
     */
    public function __construct(ScholarshipService $scholarshipService)
    {
        $this->scholarshipService = $scholarshipService;
    }

    /**
     * Get all scholarships
     */
    public function getScholarships()
    {
        try {
            $scholarships = $this->scholarshipService->getAllScholarships();
            
            return response()->json([
                'status' => true,
                'data' => $scholarships
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve scholarships',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show a specific scholarship
     */
    public function showScholarship(Scholarship $scholarship)
    {
        try {
            $scholarship = $this->scholarshipService->getScholarshipById($scholarship->id);
            
            return response()->json([
                'status' => true,
                'data' => $scholarship
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve scholarship',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a new scholarship
     */
    public function storeScholarship(Request $request)
    {
        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'provider' => 'required|string|max:255',
                'amount' => 'nullable|numeric|min:0',
                'requirements' => 'nullable|string',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
                'application_deadline' => 'required|date',
                'quota' => 'nullable|integer|min:1',
                'contact_person' => 'nullable|string|max:255',
                'contact_email' => 'nullable|email|max:255',
                'contact_phone' => 'nullable|string|max:20',
                'cover_image_id' => 'nullable|exists:media,id',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $scholarship = $this->scholarshipService->createScholarship($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Scholarship created successfully',
                'data' => $scholarship
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to create scholarship',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing scholarship
     */
    public function updateScholarship(Request $request, Scholarship $scholarship)
    {
        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'provider' => 'required|string|max:255',
                'amount' => 'nullable|numeric|min:0',
                'requirements' => 'nullable|string',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
                'application_deadline' => 'required|date',
                'quota' => 'nullable|integer|min:1',
                'contact_person' => 'nullable|string|max:255',
                'contact_email' => 'nullable|email|max:255',
                'contact_phone' => 'nullable|string|max:20',
                'cover_image_id' => 'nullable|exists:media,id',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $updatedScholarship = $this->scholarshipService->updateScholarship($scholarship, $request->all());

            return response()->json([
                'status' => true,
                'message' => 'Scholarship updated successfully',
                'data' => $updatedScholarship
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update scholarship',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a scholarship
     */
    public function deleteScholarship(Scholarship $scholarship)
    {
        try {
            $result = $this->scholarshipService->deleteScholarship($scholarship);

            return response()->json([
                'status' => true,
                'message' => 'Scholarship deleted successfully'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete scholarship',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}