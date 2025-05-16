<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentOrganization extends Controller
{
    public function index()
    {
        return Inertia::render("Students/Organization/Index");
    }
}
