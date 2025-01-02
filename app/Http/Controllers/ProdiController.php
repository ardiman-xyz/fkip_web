<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdiController extends Controller
{
    public function undergraduate()
    {
        return Inertia::render("Web/Program/Undergraduate");
    }


    public function magister()
    {
        return Inertia::render("Web/Program/Magister");
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
}
