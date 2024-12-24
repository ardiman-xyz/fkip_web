<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Pulse\Facades\Pulse;

class PulseController extends Controller
{

    public function index()
    {
        return Inertia::render("Pulse/Index");
    }

    public function stats()
    {
        return response()->json([
            'servers' => Pulse::servers(),
            'slow_requests' => Pulse::slowRequests(),
            'slow_jobs' => Pulse::slowJobs(),
            'slow_queries' => Pulse::slowQueries(),
            'exceptions' => Pulse::exceptions(),
            'queues' => Pulse::queues(),
            'cache' => Pulse::cache(),
        ]);
    }
}
