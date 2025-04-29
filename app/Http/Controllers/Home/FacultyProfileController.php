<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\History;
use App\Services\AboutService;
use App\Services\ContactInfoService;
use App\Services\HistoryService;
use App\Services\LeaderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyProfileController extends Controller
{

    public function __construct(
        private HistoryService $historyService, 
        private AboutService $aboutService,
        private LeaderService $leaderService,
        private ContactInfoService $contactInfoService
    )
   {}

    public function history()
    {

        $history = $this->historyService->getFirst();

        return Inertia::render("Web/Faculty/History", compact("history"));
    }

    public function visionMission()
    {
        $about = $this->aboutService->getVisionMissionFirst();

        return Inertia::render('Web/Faculty/VisionMission', [
            'about' => $about
        ]);
    }

    public function leaders()
    {
        $leaders = $this->leaderService->getAll();
        return Inertia::render('Web/Faculty/Leaders', compact("leaders"));
    }

    public function organization()
    {
        $organizationStructure = $this->aboutService->getStructure();
        return Inertia::render('Web/Faculty/Organization', compact("organizationStructure"));
    }

    public function contact()
    {
        $contact = $this->contactInfoService->getFirstHome();
        return Inertia::render('Web/Faculty/ContactInfo', compact("contact"));
    }


    public function lecturer()
    {
        return Inertia::render('Web/Faculty/Lecturer');
    }

    public function employee()
    {
        return Inertia::render('Web/Faculty/Employee');
    }

    public function lecturerDetail(string $id)
    {
        return Inertia::render("Web/Faculty/LecturerDetail");
    }
}
