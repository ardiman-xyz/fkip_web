<?php

use App\Http\Controllers\Home\FacultyProfileController;
use App\Http\Controllers\ProdiController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, "index"])->name("welcome");
Route::get('berita/{slug}', [WelcomeController::class, "newsDetail"])->name("news.detail");
Route::get('berita', [WelcomeController::class, "news"])->name("news");

Route::get('/agenda/{slug}', [WelcomeController::class, 'eventDetail'])->name('event.detail');
Route::get('/agenda', [WelcomeController::class, 'events'])->name('event.all');

Route::prefix('fakultas')->name('fakultas.')->group(function () {
    Route::get('/sejarah', [FacultyProfileController::class, 'history'])->name('history');
    Route::get('/visi-misi', [FacultyProfileController::class, 'visionMission'])->name('vision-mission');
    Route::get('/pimpinan', [FacultyProfileController::class, 'leaders'])->name('leaders');
    Route::get('/struktur-organisasi', [FacultyProfileController::class, 'organization'])->name('organization');
    Route::get('/fasilitas', [FacultyProfileController::class, 'facilities'])->name('facilities');
    Route::get('/lokasi-kontak', [FacultyProfileController::class, 'contact'])->name('contact');
    Route::get('/dosen', [FacultyProfileController::class, 'lecturer'])->name('lecturer');
    Route::get('/dosen/{id}', [FacultyProfileController::class, 'lecturerDetail'])->name('lecturer.detail');
    Route::get('/tendik', [FacultyProfileController::class, 'employee'])->name('employee');
});

Route::prefix('program')->name('program.')->group(function () {
    Route::get('sarjana', [ProdiController::class, 'undergraduate'])->name('undergraduate');
    Route::get('magister', [ProdiController::class, 'magister'])->name('magister');
    Route::get('detail/{slug}', [ProdiController::class, 'detail'])->name('detail');
});

Route::get('akademik/kalender', [ProdiController::class, 'kalenderAkdemik']);

Route::prefix('kemahasiswaan')->name('kemahasiswaan.')->group(function () {
    Route::get('organisasi', [ProdiController::class, 'organisasi'])->name('organisasi');
    Route::get('/organisasi/{slug}', [ProdiController::class, 'organizationDetail'])->name('kemahasiswaan.organisasi.detail');
    Route::get('beasiswa', [ProdiController::class, 'scholarship'])->name('scholarship');
    Route::get('prestasi', [ProdiController::class, 'achievement'])->name('achievement');
});

Route::get('/pengumuman', [WelcomeController::class, 'announcements'])->name('announcements');
Route::get('/pengumuman/{slug}', [WelcomeController::class, 'announcementDetail'])->name('announcements.detail');