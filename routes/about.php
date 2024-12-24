<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AccreditationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::controller(AboutController::class)->prefix('about-us')->name('about-us.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/vision-mission', 'show')->name('vision-mission.show');
        Route::post('/vision-mission', 'updateVisionMission')->name('vision-mission.update');
    });

    Route::controller(AccreditationController::class)->prefix('accreditation')->name('accreditation.')->group(function() {
        Route::post('/', 'store')->name('store');
        Route::get('/', 'getAll')->name('get');
        Route::delete('/{accreditation}','destroy')->name('destroy');
        Route::put('/{accreditation}', 'update')->name('update');
        Route::post('/{accreditation}/order','updateOrder')->name('update-order');
    });
});