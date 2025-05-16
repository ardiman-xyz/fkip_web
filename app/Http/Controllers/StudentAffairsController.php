<?php

namespace App\Http\Controllers;

use App\Models\StudentOrganization;
use App\Models\StudentOrganizationOfficer;
use App\Services\StudentOrganizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class StudentAffairsController extends Controller
{
    protected $organizationService;

    /**
     * Create a new controller instance.
     *
     * @param StudentOrganizationService $organizationService
     */
    public function __construct(StudentOrganizationService $organizationService)
    {
        $this->organizationService = $organizationService;
    }

    /**
     * Display the student affairs page
     */
    public function index()
    {


        return Inertia::render("Students/Index");
    }

    /**
     * Get all organizations
     */
    public function getOrganizations()
    {
        try {
            $organizations = $this->organizationService->getAllOrganizations();
            
            return response()->json([
                'status' => true,
                'data' => $organizations
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve organizations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show a specific organization
     */
    public function showOrganization(StudentOrganization $organization)
    {
        try {
            $organization = $this->organizationService->getOrganizationById($organization->id);
            
            return response()->json([
                'status' => true,
                'data' => $organization
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve organization',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a new organization
     */
    public function storeOrganization(Request $request)
    {
        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'logo_id' => 'nullable|exists:media,id',
                'cover_image_id' => 'nullable|exists:media,id',
                'founding_year' => 'nullable|string|max:4',
                'email' => 'nullable|email|max:255',
                'instagram' => 'nullable|string|max:255',
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

            $organization = $this->organizationService->createOrganization($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Organization created successfully',
                'data' => $organization
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to create organization',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing organization
     */
    public function updateOrganization(Request $request, StudentOrganization $organization)
    {
        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'logo_id' => 'nullable|exists:media,id',
                'cover_image_id' => 'nullable|exists:media,id',
                'founding_year' => 'nullable|string|max:4',
                'email' => 'nullable|email|max:255',
                'instagram' => 'nullable|string|max:255',
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

            $updatedOrganization = $this->organizationService->updateOrganization($organization, $request->all());

            return response()->json([
                'status' => true,
                'message' => 'Organization updated successfully',
                'data' => $updatedOrganization
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update organization',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete an organization
     */
    public function deleteOrganization(StudentOrganization $organization)
    {
        try {
            $result = $this->organizationService->deleteOrganization($organization);

            return response()->json([
                'status' => true,
                'message' => 'Organization deleted successfully'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete organization',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get officers for a specific organization
     */
    public function getOrganizationOfficers(StudentOrganization $organization)
    {
        try {
            $officers = StudentOrganizationOfficer::where('student_organization_id', $organization->id)
                ->orderBy('order')
                ->get();
                
            return response()->json([
                'status' => true,
                'data' => $officers
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve officers',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a new officer for an organization
     */
    public function storeOrganizationOfficer(Request $request, StudentOrganization $organization)
    {
        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'image' => 'nullable|string',
                'period' => 'required|string|max:255',
                'is_active' => 'boolean',
                'order' => 'nullable|integer',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Determine order if not provided
            if (!$request->has('order')) {
                $maxOrder = StudentOrganizationOfficer::where('student_organization_id', $organization->id)
                    ->max('order');
                $order = $maxOrder ? $maxOrder + 1 : 1;
            } else {
                $order = $request->order;
            }

            // Create officer
            $officer = StudentOrganizationOfficer::create([
                'student_organization_id' => $organization->id,
                'name' => $request->name,
                'position' => $request->position,
                'image' => $request->image,
                'period' => $request->period,
                'is_active' => $request->has('is_active') ? $request->is_active : true,
                'order' => $order,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Officer added successfully',
                'data' => $officer
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to add officer',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing officer
     */
    public function updateOrganizationOfficer(Request $request, StudentOrganization $organization, StudentOrganizationOfficer $officer)
    {
        try {
            // Check if officer belongs to organization
            if ($officer->student_organization_id !== $organization->id) {
                return response()->json([
                    'status' => false,
                    'message' => 'Officer does not belong to this organization'
                ], 403);
            }

            // Validate request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'image' => 'nullable|string',
                'period' => 'required|string|max:255',
                'is_active' => 'boolean',
                'order' => 'nullable|integer',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Update officer
            $officer->update([
                'name' => $request->name,
                'position' => $request->position,
                'image' => $request->image,
                'period' => $request->period,
                'is_active' => $request->has('is_active') ? $request->is_active : $officer->is_active,
                'order' => $request->has('order') ? $request->order : $officer->order,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Officer updated successfully',
                'data' => $officer->fresh()
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update officer',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete an officer
     */
    public function deleteOrganizationOfficer(StudentOrganization $organization, StudentOrganizationOfficer $officer)
    {
        try {
            // Check if officer belongs to organization
            if ($officer->student_organization_id !== $organization->id) {
                return response()->json([
                    'status' => false,
                    'message' => 'Officer does not belong to this organization'
                ], 403);
            }

            // Delete officer
            $officer->delete();

            return response()->json([
                'status' => true,
                'message' => 'Officer deleted successfully'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete officer',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}