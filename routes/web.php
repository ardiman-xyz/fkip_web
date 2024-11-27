<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $users = User::where('id', '!=', Auth::id())->simplePaginate(10);

    return Inertia::render('Dashboard', ['users' => $users]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    
    // Tags Management
    Route::controller(TagController::class)->prefix('tags')->name('tags.')->group(function() {
        Route::get('/', 'index')->name('index');
          Route::get('/get', 'getAll')->name('get');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{tag}/edit', 'edit')->name('edit');
        Route::put('/{tag}', 'update')->name('update');
        Route::delete('/{tag}', 'destroy')->name('destroy');
    });

    // News Management
    // Route::controller(NewsController::class)->prefix('news')->name('news.')->group(function() {
    //     Route::get('/', 'index')->name('index');
    //     Route::get('/create', 'create')->name('create');
    //     Route::post('/', 'store')->name('store');
    //     Route::get('/{news}/edit', 'edit')->name('edit');
    //     Route::put('/{news}', 'update')->name('update');
    //     Route::delete('/{news}', 'destroy')->name('destroy');
    // });

    // // Events Management
    // Route::controller(EventController::class)->prefix('events')->name('events.')->group(function() {
    //     Route::get('/', 'index')->name('index');
    //     Route::get('/create', 'create')->name('create');
    //     Route::post('/', 'store')->name('store');
    //     Route::get('/{event}/edit', 'edit')->name('edit');
    //     Route::put('/{event}', 'update')->name('update');
    //     Route::delete('/{event}', 'destroy')->name('destroy');
    // });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
