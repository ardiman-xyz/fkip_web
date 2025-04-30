<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\History;
use App\Services\AboutService;
use App\Services\ContactInfoService;
use App\Services\HistoryService;
use App\Services\LeaderService;
use App\Services\LecturerFrontService;
use App\Services\StaffFrontService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyProfileController extends Controller
{

    public function __construct(
        private HistoryService $historyService, 
        private AboutService $aboutService,
        private LeaderService $leaderService,
        private ContactInfoService $contactInfoService,
        private LecturerFrontService $lecturerFrontService,
        private StaffFrontService $staffFrontService
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
        $lecturers = $this->lecturerFrontService->getAllForDirectory();
        
        return Inertia::render('Web/Faculty/Lecturer', [
            'lecturers' => $lecturers
        ]);
    }

    public function employee()
    {
        $staff = $this->staffFrontService->getAllForDirectory();
        
        return Inertia::render('Web/Faculty/Employee', [
            'staff' => $staff
        ]);
    }

    public function lecturerDetail(string $id)
    {
        try {
            $lecturer = $this->lecturerFrontService->getDetailById($id);
            
            return Inertia::render("Web/Faculty/LecturerDetail", [
                'lecturer' => $lecturer
            ]);
        } catch (\Exception $e) {
            // Handle the case when lecturer is not found
            return redirect()->route('fakultas.lecturer')->with('error', 'Dosen tidak ditemukan');
        }
    }
}
