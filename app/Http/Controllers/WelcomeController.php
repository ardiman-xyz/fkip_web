<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function detailBerita()
    {
        return Inertia::render("Web/News/Detail");
    }
}
