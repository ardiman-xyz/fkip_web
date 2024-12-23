<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Jobs\UserLoginLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        if (env('APP_ENV') === 'production' || env('APP_ENV') === 'staging') {
            $logData = [
                'Name' => Auth::user()->name,
                'Email' => Auth::user()->email,
                'Time' => now()->format('Y-m-d H:i:s'),
                'IP' => $request->ip(),
                'Device' => $request->userAgent(),
                'Environment' => app()->environment(),
                'Location' => $request->header('CF-IPCountry', 'Unknown'),
                'Login Method' => $request->hasHeader('Authorization') ? 'API' : 'Web',
                'Previous URL' => url()->previous(),
                'Session ID' => session()->getId(),
                'Request Method' => $request->method(),
                'App Version' => config('app.version', '1.0.0'),
                'Browser Language' => $request->getPreferredLanguage(),
                'Server IP' => $_SERVER['SERVER_ADDR'] ?? 'Unknown',
            ];

            UserLoginLog::dispatch($logData);
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
