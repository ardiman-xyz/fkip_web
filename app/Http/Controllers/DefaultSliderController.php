<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSlideRequest;
use App\Models\DefaultSlider;
use App\Services\SlideService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DefaultSliderController extends Controller
{
    public function __construct(
        protected SlideService $slideService
    ) {}

    public function index(): InertiaResponse
    {
        return Inertia::render('Slider/Index');
    }

    public function getSlides(): JsonResponse
    {
        try {
            $slides = $this->slideService->getAllSlides();
            return response()->json([
                'message' => 'Slide created successfully',
                'data' => $slides
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create slide',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(StoreSlideRequest $request): JsonResponse
    {
        try {
            $slide = $this->slideService->create($request->validated());
            return response()->json([
                'message' => 'Slide created successfully',
                'data' => $slide
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create slide',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function moveUp(DefaultSlider $slide): JsonResponse
    {
        try {
            $this->slideService->moveUp($slide);
            return response()->json([
                'message' => 'Slide order updated'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function moveDown(DefaultSlider $slide): JsonResponse
    {
        try {
            $this->slideService->moveDown($slide);
            return response()->json([
                'message' => 'Slide order updated'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update order',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function destroy(DefaultSlider $slide): JsonResponse
    {
        try {
            $this->slideService->delete($slide);
            return response()->json([
                'message' => 'Slide deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete slide',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
