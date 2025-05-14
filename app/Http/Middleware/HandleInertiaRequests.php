<?php

namespace App\Http\Middleware;

use App\Models\EducationLevel;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'app_version' => env('APP_VERSION', 'v1.0.0'),
            'meta' => $this->getDefaultMeta($request),
            'education_levels' => $this->getEducationLevels(),
        ];
    }

      /**
     * Get education levels for use across the application
     * Cache this data to improve performance
     */
    private function getEducationLevels(): array
    {
        return cache()->remember('education_levels', 60 * 60, function () {
            return EducationLevel::orderBy('order')->get()->map(function ($level) {
                return [
                    'id' => $level->id,
                    'name' => $level->name,
                    'code' => $level->code,
                    'slug' => $level->slug,
                ];
            })->toArray();
        });
    }


    private function getDefaultMeta(Request $request): array
    {
        return [
            'title' => config('app.name', 'FKIP UMKendari'),
            'description' => 'Fakultas Keguruan dan Ilmu Pendidikan Universitas Muhammadiyah Kendari',
            'type' => 'website',
            'url' => $request->url(),
            'image' => asset('images/og.jpg'), // Sesuaikan dengan image default
        ];
    }
}
