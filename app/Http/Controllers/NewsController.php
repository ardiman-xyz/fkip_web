<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        return Inertia::render("News/Index");
    }

    public function create()
    {
        return Inertia::render("News/Create");
    }
}
