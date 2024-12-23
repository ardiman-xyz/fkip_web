<?php

use App\Http\Controllers\AboutController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {

    Route::controller(AboutController::class)->prefix('about-us')->name('about-us.')->group(function() {
        Route::get('/', 'index')->name('index');
        // Route::get('/get', 'getAll')->name('get');
        // Route::post('/', 'store')->name('store');
        // Route::get('/{tag}/edit', 'edit')->name('edit');
        // Route::put('/{tag}', 'update')->name('update');
        // Route::delete('/{tag}', 'destroy')->name('destroy');
    });
});