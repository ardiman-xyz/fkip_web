<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class FeaturesController extends Controller
{
    /**
     * Display the features page
     */
    public function index(): InertiaResponse
    {
        return Inertia::render('Web/Features');
    }
}