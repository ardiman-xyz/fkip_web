<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AccreditationController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\LeaderController;
use App\Http\Controllers\LecturerController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::controller(AboutController::class)->prefix('about-us')->name('about-us.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/vision-mission', 'show')->name('vision-mission.show');
        Route::post('/vision-mission', 'updateVisionMission')->name('vision-mission.update');
        Route::get('/structure', 'getStructure')->name('structure.get');
        Route::post('/structure', 'updateStructure')->name('structure.update');
    });

    Route::controller(AccreditationController::class)->prefix('accreditation')->name('accreditation.')->group(function() {
        Route::post('/', 'store')->name('store');
        Route::get('/', 'getAll')->name('get');
        Route::delete('/{accreditation}','destroy')->name('destroy');
        Route::put('/{accreditation}', 'update')->name('update');
        Route::post('/{accreditation}/order','updateOrder')->name('update-order');

    });

    Route::controller(LeaderController::class)->prefix('leaders')->name('leaders.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/data', 'getData')->name('get');
        Route::post('/', 'store')->name('store');
        Route::put('/{leader}', 'update')->name('update');
        Route::delete('/{leader}', 'destroy')->name('destroy');
        Route::post('/{leader}/order', 'updateOrder')->name('update-order');
    });

    Route::controller(HistoryController::class)->prefix('histories')->name('histories.')->group(function() {
        Route::get('/data', 'getData')->name('get');
        Route::post('/', 'store')->name('store');
        Route::put('/{history}', 'update')->name('update');
     });

     Route::controller(LecturerController::class)->prefix('lecturers')->name('lecturers.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/data', 'getData')->name('get');
        Route::post('/', 'store')->name('store');
        Route::post('/{lecturer}', 'update')->name('update');
        Route::delete('/{lecturer}', 'destroy')->name('destroy');
        Route::post('/{lecturer}/order', 'updateOrder')->name('update-order');
    });
});