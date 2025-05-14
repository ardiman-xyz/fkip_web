<?php

namespace App\Http\Controllers;

use App\Models\EducationLevel;
use App\Services\EducationLevelService;
use App\Services\StudyProgramService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdiController extends Controller
{

    public function __construct(
        protected EducationLevelService $educationLevelService,
        protected StudyProgramService $studyProgramService,
    ){}

    public function undergraduate()
    {
        $programS1 = $this->studyProgramService->getStudyProgramsByLevel('S1');
        
        return Inertia::render("Web/Program/Undergraduate", [
            'programs' => $programS1
        ]);
    }


   /**
     * Menampilkan program magister
     */
    public function magister()
    {
        $programs = $this->studyProgramService->getStudyProgramsByLevel("S2");
       
        
        return Inertia::render("Web/Program/Magister", [
            'programs' => $programs
        ]);
    }

    public function kalenderAkdemik()
    {
        return Inertia::render("Web/KalenderAkademik");
    }

    public function organisasi()
    {
        return Inertia::render("Web/Student/Organization");
    }

    public function scholarship()
    {
        return Inertia::render("Web/Student/Scholarship");
    }

    public function achievement()
    {
        return Inertia::render("Web/Student/Achievement");
    }

     /**
     * Menampilkan detail program studi
     */
    public function detail($slug)
    {
        // Ambil data program studi berdasarkan slug
        $programStudi = $this->studyProgramService->getStudyProgramBySlug($slug);
        
        // Jika program studi tidak ditemukan, redirect ke halaman sarjana
        if (!$programStudi) {
            return redirect()->route('program.undergraduate');
        }
        
        // Ambil data dosen untuk program studi ini
        $dosen = $this->studyProgramService->getDosenByStudyProgram($programStudi['id']);
        
        return Inertia::render("Web/Program/Detail", [
            'program' => $programStudi,
            'dosen' => $dosen
        ]);
    }
}
