<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\ResponseApi;
use App\Models\Event;
use App\Services\CategoryService;
use App\Services\EventService;
use App\Services\TagService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{

    public function __construct(
        protected CategoryService $categoryService,
        protected TagService $tagService,
        protected EventService $eventService,
    ){}

    public function index()
    {

        $events = $this->eventService->getAllWithTranslations();

        return Inertia::render("Event/Index", [
            "events" => $events
        ]);
    }


    public function create()
    {

        $categories = $this->categoryService->getAllWithTranslationsLabelAndValues();
        $tags = $this->tagService->getAllWithTranslationsLabelAndValues();

        return Inertia::render("Event/Create", [
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    public function store(StoreEventRequest $request)
    {
        try {
            $event = $this->eventService->create($request->validated());
            return ResponseApi::success($event, 'Event created successfully');
        } catch (\Exception $e) {
            return ResponseApi::error('Failed to create event', 500, ['error' => $e->getMessage()]);
        }
    }

    public function edit(Event $event)
    {

        $categories = $this->categoryService->getAllWithTranslationsLabelAndValues();
        $tags = $this->tagService->getAllWithTranslationsLabelAndValues();
        $event = $this->eventService->getEventForEdit($event);

        return Inertia::render("Event/Edit", [
            'categories' => $categories,
            'tags' => $tags,
            'event' => $event
        ]);
    }


    public function update(UpdateEventRequest $request, Event $event)
    {
        try {
            $data = $request->validated();
            $updatedEvent = $this->eventService->update($event, $data);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Event updated successfully',
                'data' => $updatedEvent
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update event',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Event $event)
    {
        try {
            $this->eventService->delete($event);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Event deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete event',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
