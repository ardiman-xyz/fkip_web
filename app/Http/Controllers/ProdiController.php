<?php

namespace App\Http\Controllers;

use App\Models\EducationLevel;
use App\Services\EducationLevelService;
use App\Services\StudentOrganizationService;
use App\Services\StudyProgramService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdiController extends Controller
{

    protected $educationLevelService;
    protected $studyProgramService;
    protected $studentOrganizationService;

    public function __construct(
        EducationLevelService $educationLevelService,
        StudyProgramService $studyProgramService,
        StudentOrganizationService $studentOrganizationService
    ){
        $this->educationLevelService = $educationLevelService;
        $this->studyProgramService = $studyProgramService;
        $this->studentOrganizationService = $studentOrganizationService;
    }

    /**
         * Menampilkan program sarjana
         */
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
        // Mengambil data organisasi kemahasiswaan dari database
        $organizations = $this->studentOrganizationService->getAllOrganizations()
            ->map(function ($organization) {
                // Ambil terjemahan bahasa Indonesia (language_id = 1)
                $indonesianTranslation = $organization->translations
                    ->where('language_id', 1)
                    ->first();
                
                return [
                    'id' => $organization->id,
                    'name' => $indonesianTranslation ? $indonesianTranslation->name : $organization->name,
                    'slug' => $organization->slug,
                    'description' => $indonesianTranslation ? $indonesianTranslation->description : $organization->description,
                    'founding_year' => $organization->founding_year,
                    'email' => $organization->email,
                    'instagram' => $organization->instagram,
                    'is_active' => $organization->is_active,
                    'is_featured' => $organization->is_featured,
                    'logo' => $organization->logo ? [
                        'id' => $organization->logo->id,
                        'path' => $organization->logo->path,
                        'paths' => $organization->logo->paths
                    ] : null,
                    'cover_image' => $organization->coverImage ? [
                        'id' => $organization->coverImage->id,
                        'path' => $organization->coverImage->path,
                        'paths' => $organization->coverImage->paths
                    ] : null,
                ];
            })
            ->toArray();
        
        return Inertia::render("Web/Student/Organization", [
            'organizations' => $organizations
        ]);
    }

     /**
     * Menampilkan halaman detail organisasi kemahasiswaan
     * 
     * @param string $slug
     * @return \Inertia\Response
     */
    public function organizationDetail($slug)
    {
        // Mengambil data organisasi kemahasiswaan berdasarkan slug
        $organization = $this->studentOrganizationService->getOrganizationBySlug($slug);
        
        // Jika organisasi tidak ditemukan, redirect ke halaman daftar organisasi
        if (!$organization) {
            return redirect()->route('kemahasiswaan.organisasi');
        }
        
        // Format data organisasi untuk frontend
        $formattedOrganization = [
            'id' => $organization->id,
            'name' => $organization->name,
            'slug' => $organization->slug,
            'description' => $organization->description,
            'founding_year' => $organization->founding_year,
            'email' => $organization->email,
            'instagram' => $organization->instagram,
            'is_active' => $organization->is_active,
            'is_featured' => $organization->is_featured,
            'logo' => $organization->logo ? [
                'id' => $organization->logo->id,
                'path' => $organization->logo->path,
                'paths' => $organization->logo->paths
            ] : null,
            'cover_image' => $organization->coverImage ? [
                'id' => $organization->coverImage->id,
                'path' => $organization->coverImage->path,
                'paths' => $organization->coverImage->paths
            ] : null,
        ];
        
        // Ambil data terjemahan (jika ada)
        if ($organization->translations && $organization->translations->isNotEmpty()) {
            $indonesianTranslation = $organization->translations
                ->where('language_id', 1)
                ->first();
                
            if ($indonesianTranslation) {
                $formattedOrganization['translations'] = [
                    'vision' => $indonesianTranslation->vision,
                    'mission' => $indonesianTranslation->mission
                ];
                
                // Update nama dan deskripsi dengan versi terjemahan jika tersedia
                $formattedOrganization['name'] = $indonesianTranslation->name ?: $organization->name;
                $formattedOrganization['description'] = $indonesianTranslation->description ?: $organization->description;
            }
        }
        
        // Ambil data pengurus organisasi (jika ada)
        if ($organization->officers && $organization->officers->isNotEmpty()) {
            $formattedOrganization['officers'] = $organization->officers->map(function($officer) {
                return [
                    'id' => $officer->id,
                    'name' => $officer->name,
                    'position' => $officer->position,
                    'period' => $officer->period,
                    'image' => $officer->image ? [
                        'id' => $officer->image->id,
                        'path' => $officer->image->path,
                        'paths' => $officer->image->paths
                    ] : null
                ];
            })->toArray();
        }
        
        return Inertia::render("Web/Student/OrganizationDetail", [
            'organization' => $formattedOrganization
        ]);
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
