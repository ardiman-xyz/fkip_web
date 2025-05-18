<?php

namespace App\Http\Controllers;

use App\Models\EducationLevel;
use App\Services\EducationLevelService;
use App\Services\ScholarshipService;
use App\Services\StudentOrganizationService;
use App\Services\StudyProgramService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdiController extends Controller
{

    protected $educationLevelService;
    protected $studyProgramService;
    protected $studentOrganizationService;
    protected $scholarshipService;

    public function __construct(
        EducationLevelService $educationLevelService,
        StudyProgramService $studyProgramService,
        StudentOrganizationService $studentOrganizationService,
        ScholarshipService $scholarshipService
    ){
        $this->educationLevelService = $educationLevelService;
        $this->studyProgramService = $studyProgramService;
        $this->studentOrganizationService = $studentOrganizationService;
        $this->scholarshipService = $scholarshipService;
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

      /**
     * Menampilkan halaman beasiswa
     */
    public function scholarship()
    {
        // Ambil data beasiswa dari database menggunakan ScholarshipService
        $scholarships = $this->scholarshipService->getAllScholarships();
        
        // Mengelompokkan beasiswa yang masih aktif di bagian atas
        $activeScholarships = $scholarships->filter(function ($scholarship) {
            return $scholarship['is_active'] && 
                  (new \DateTime($scholarship['application_deadline'])) >= (new \DateTime());
        });
        
        $inactiveScholarships = $scholarships->filter(function ($scholarship) {
            return !$scholarship['is_active'] || 
                  (new \DateTime($scholarship['application_deadline'])) < (new \DateTime());
        });
        
        // Gabungkan beasiswa aktif di atas dan tidak aktif di bawah
        $sortedScholarships = $activeScholarships->merge($inactiveScholarships);
        
        return Inertia::render("Web/Student/Scholarship", [
            'scholarships' => $sortedScholarships->values()->toArray()
        ]);
    }


    // public function achievement()
    // {
    //     return Inertia::render("Web/Student/Achievement");
    // }

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

    public function achievement()
    {
        // Query untuk mendapatkan berita dengan tag "prestasi" (bahasa Indonesia)
        $achievements = \App\Models\News::query()
            ->join('news_tags', 'news.id', '=', 'news_tags.news_id')
            ->join('tags', 'news_tags.tag_id', '=', 'tags.id')
            ->join('tag_translations', 'tags.id', '=', 'tag_translations.tag_id')
            ->join('news_translations', 'news.id', '=', 'news_translations.news_id')
            ->leftJoin('media', 'news.media_id', '=', 'media.id')
            ->where('tag_translations.name', 'prestasi') // Tag "prestasi" dalam bahasa Indonesia
            ->where('tag_translations.language_id', 1) // Pastikan bahasa Indonesia (ID = 1)
            ->where('news_translations.language_id', 1) // Pastikan konten berita bahasa Indonesia
            ->where('news.status', 'published')
            ->select([
                'news.id',
                'news_translations.title',
                'news_translations.slug',
                'news_translations.content',
                'news.publish_date as date',
                'media.id as media_id',
                'media.path',
                'media.paths'
            ])
            ->orderBy('news.publish_date', 'desc')
            ->get()
            ->map(function ($item) {
                // Ekstrak level (Nasional, Internasional, dll)
                $level = $this->determineLevelFromContent($item->content);
                
                // Ekstrak kategori (Akademik, Non-Akademik, dll)
                $category = $this->determineCategoryFromContent($item->content);
                
                // Ekstrak nama mahasiswa
                $students = $this->extractStudentsFromContent($item->content);
                
                // Ekstrak nama event
                $event = $this->extractEventFromContent($item->title, $item->content);
                
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'content' => $item->content,
                    'event' => $event,
                    'level' => $level,
                    'date' => $item->date,
                    'students' => $students,
                    'category' => $category,
                    'image' => $item->media_id ? [
                        'id' => $item->media_id,
                        'path' => $item->path,
                        'paths' => json_decode($item->paths, true)
                    ] : null
                ];
            });

        return Inertia::render("Web/Student/Achievement", [
            'achievements' => $achievements
        ]);
    }

    /**
     * Ekstrak level prestasi (Internasional, Nasional, Regional, Lokal)
     */
    private function determineLevelFromContent($content)
    {
        $contentLower = strtolower($content);
        
        if (strpos($contentLower, 'internasional') !== false || 
            strpos($contentLower, 'international') !== false) {
            return 'Internasional';
        } 
        elseif (strpos($contentLower, 'nasional') !== false || 
                strpos($contentLower, 'national') !== false) {
            return 'Nasional';
        }
        elseif (strpos($contentLower, 'regional') !== false || 
                strpos($contentLower, 'provinsi') !== false || 
                strpos($contentLower, 'wilayah') !== false) {
            return 'Regional';
        }
        else {
            return 'Lokal'; // Default jika tidak ditemukan
        }
    }

    /**
     * Ekstrak kategori prestasi (Akademik, Non-Akademik, dll)
     */
    private function determineCategoryFromContent($content)
    {
        $contentLower = strtolower($content);
        
        if (strpos($contentLower, 'penelitian') !== false || 
            strpos($contentLower, 'karya tulis') !== false || 
            strpos($contentLower, 'paper') !== false) {
            return 'Penelitian';
        }
        elseif (strpos($contentLower, 'olahraga') !== false || 
                strpos($contentLower, 'sport') !== false || 
                strpos($contentLower, 'bola') !== false || 
                strpos($contentLower, 'karate') !== false || 
                strpos($contentLower, 'atletik') !== false) {
            return 'Non-Akademik';
        }
        elseif (strpos($contentLower, 'seni') !== false || 
                strpos($contentLower, 'musik') !== false || 
                strpos($contentLower, 'teater') !== false || 
                strpos($contentLower, 'tari') !== false || 
                strpos($contentLower, 'budaya') !== false) {
            return 'Seni Budaya';
        }
        elseif (strpos($contentLower, 'inovasi') !== false || 
                strpos($contentLower, 'teknologi') !== false || 
                strpos($contentLower, 'aplikasi') !== false || 
                strpos($contentLower, 'digital') !== false) {
            return 'Inovasi';
        }
        else {
            return 'Akademik'; // Default kategori
        }
    }

    /**
     * Ekstrak nama mahasiswa dari konten berita
     */
    private function extractStudentsFromContent($content)
    {
        // Implementasi sederhana, bisa disesuaikan dengan format konten
        $students = [];
        
        // Coba cari nama yang disebutkan setelah kata "mahasiswa", "diraih oleh", dll
        $patterns = [
            '/mahasiswa[^\.,]*?(?:bernama|yaitu|adalah)\s*([^\.,:;]+)(?:,|\.|;)/i',
            '/diraih\s+oleh\s+([^\.,:;]+)(?:,|\.|;)/i',
            '/(?:tim|delegasi)[^\.,]*?(?:terdiri dari|beranggotakan)\s*([^\.,:;]+)(?:,|\.|;)/i'
        ];
        
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $content, $matches)) {
                if (!empty($matches[1])) {
                    // Pisahkan nama jika ada beberapa
                    $namesRaw = preg_split('/\sdan\s|\s*,\s*/', trim($matches[1]));
                    foreach ($namesRaw as $name) {
                        $name = trim($name);
                        if (!empty($name) && strlen($name) > 3) {
                            $students[] = $name;
                        }
                    }
                }
            }
        }
        
        // Jika tidak ditemukan nama, beri array kosong atau nama default
        if (empty($students)) {
            return ["Mahasiswa FKIP"];
        }
        
        return array_unique($students);
    }

    /**
     * Ekstrak nama event dari judul dan konten berita
     */
    private function extractEventFromContent($title, $content)
    {
        // Periksa judul untuk event
        if (preg_match('/dalam\s+(.*?)(?:,|\.|$)/i', $title, $matches)) {
            if (!empty($matches[1])) {
                return trim($matches[1]);
            }
        }
        
        // Atau cek konten untuk event
        $patterns = [
            '/dalam\s+(lomba|kompetisi|kejuaraan|kontes|olimpiade|festival)[^\.]*?(?:yang|di|pada)?\s*([^\.]+)(?:,|\.|$)/i',
            '/mengikuti\s+(lomba|kompetisi|kejuaraan|kontes|olimpiade|festival)[^\.]*?\s*([^\.]+)(?:,|\.|$)/i'
        ];
        
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $content, $matches) && !empty($matches[2])) {
                return trim($matches[1] . ' ' . $matches[2]);
            }
        }
        
        // Jika tidak ditemukan, gunakan judul sebagai nama event
        return $title;
    }
           
}
