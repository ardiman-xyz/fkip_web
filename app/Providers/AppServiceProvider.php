<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        if($this->app->environment('production') || $this->app->environment('staging')) {
            URL::forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);
        $this->configureModels();

    }

    private function configureModels(): void
    {
        // Model::shouldBeStrict();
        Model::unguard();
    }
}
