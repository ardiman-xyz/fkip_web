<?php

use App\Http\Controllers\Home\FacultyProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('fakultas')->name('fakultas.')->group(function () {
    Route::get('/sejarah', [FacultyProfileController::class, 'history'])->name('history');
    Route::get('/visi-misi', [FacultyProfileController::class, 'visionMission'])->name('vision-mission');
    Route::get('/pimpinan', [FacultyProfileController::class, 'leaders'])->name('leaders');
    Route::get('/struktur-organisasi', [FacultyProfileController::class, 'organization'])->name('organization');
    Route::get('/fasilitas', [FacultyProfileController::class, 'facilities'])->name('facilities');
    Route::get('/lokasi-kontak', [FacultyProfileController::class, 'contact'])->name('contact');
});