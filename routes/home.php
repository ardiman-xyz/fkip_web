<?php

use App\Http\Controllers\Home\FacultyProfileController;
use App\Http\Controllers\ProdiController;
use Illuminate\Support\Facades\Route;

Route::prefix('fakultas')->name('fakultas.')->group(function () {
    Route::get('/sejarah', [FacultyProfileController::class, 'history'])->name('history');
    Route::get('/visi-misi', [FacultyProfileController::class, 'visionMission'])->name('vision-mission');
    Route::get('/pimpinan', [FacultyProfileController::class, 'leaders'])->name('leaders');
    Route::get('/struktur-organisasi', [FacultyProfileController::class, 'organization'])->name('organization');
    Route::get('/fasilitas', [FacultyProfileController::class, 'facilities'])->name('facilities');
    Route::get('/lokasi-kontak', [FacultyProfileController::class, 'contact'])->name('contact');
});

Route::prefix('program')->name('program.')->group(function () {
    Route::get('sarjana', [ProdiController::class, 'undergraduate'])->name('undergraduate');
    Route::get('magister', [ProdiController::class, 'magister'])->name('magister');
});

Route::get('akademik/kalender', [ProdiController::class, 'kalenderAkdemik']);

Route::prefix('kemahasiswaan')->name('kemahasiswaan.')->group(function () {
    Route::get('organisasi', [ProdiController::class, 'organisasi'])->name('organisasi');
    Route::get('beasiswa', [ProdiController::class, 'scholarship'])->name('scholarship');
    Route::get('prestasi', [ProdiController::class, 'achievement'])->name('achievement');
});