<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactInfoController;
use App\Http\Controllers\DefaultSliderController;
use App\Http\Controllers\EducationLevelController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LecturerController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentAffairsController;
use App\Http\Controllers\StudentOrganization;
use App\Http\Controllers\StudyProgram;
use App\Http\Controllers\StudyProgramContactController;
use App\Http\Controllers\StudyProgramDescriptionController;
use App\Http\Controllers\TagController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::get('/dashboard', function () {
    $users = User::where('id', '!=', Auth::id())->simplePaginate(10);

    return Inertia::render('Dashboard', ['users' => $users]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {

    // Tags Management
    Route::controller(TagController::class)->prefix('tags')->name('tags.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/get', 'getAll')->name('get');
        Route::post('/', 'store')->name('store');
        Route::get('/{tag}/edit', 'edit')->name('edit');
        Route::put('/{tag}', 'update')->name('update');
        Route::delete('/{tag}', 'destroy')->name('destroy');
    });

      // Categories Management
      Route::controller(CategoryController::class)->prefix('category')->name('category.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/get', 'getAll')->name('get');
        Route::post('/', 'store')->name('store');
        Route::get('/{category}/edit', 'edit')->name('edit');
        Route::put('/{category}', 'update')->name('update');
        Route::delete('/{category}', 'destroy')->name('destroy');
    });

    // News Management
    Route::controller(NewsController::class)->prefix('news')->name('news.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{news}/edit', 'edit')->name('edit');
        Route::put('/{news}', 'update')->name('update');
        Route::delete('/{news}', 'destroy')->name('destroy');
    });

    // Events Management
    Route::controller(EventController::class)->prefix('events')->name('events.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{event}/edit', 'edit')->name('edit');
        Route::put('/{event}', 'update')->name('update');
        Route::delete('/{event}', 'destroy')->name('destroy');
    });

     // Media Management
    Route::controller(MediaController::class)->prefix('media')->name('media.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('view', 'indexView')->name('indexView');
        Route::post('/upload', 'store')->name('store');
        Route::post('uploadBatch', 'storeBatch')->name('storeBatch');
        Route::put('/{media}', 'update')->name('update');
        Route::delete('/{media}', 'destroy')->name('destroy');
    });

     // Events Slider
    Route::controller(DefaultSliderController::class)->prefix('slider')->name('slider.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/slides', 'getSlides')->name('get');
        Route::post('/', 'store')->name('store');
        Route::delete('/{slide}', 'destroy')->name('destroy');
        Route::post('/{slide}/move-up', 'moveUp')->name('move-up');
        Route::post('/{slide}/move-down', 'moveDown')->name('move-down');
    });

    Route::controller(StudyProgram::class)->prefix('study-programs')->name('study-program.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/{studyProgram}', 'show')->name('show');
        Route::post('/', 'store')->name('store');
        Route::put('/{studyProgram}', 'update')->name('update');
        Route::delete('/{studyProgram}', 'destroy')->name('destroy');
    });

    Route::controller(EducationLevelController::class)->prefix('education-levels')->name('education-level.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::put('/{educationLevel}', 'update')->name('update');
        Route::delete('/{educationLevel}', 'destroy')->name('destroy');
    });

    Route::controller(StudyProgramDescriptionController::class)->prefix('study-programs')->name('study-program.description.')->group(function() {
        Route::post('/{studyProgramId}/description', 'store')->name('store');
        Route::put('/{studyProgramId}/description/{descriptionId}', 'update')->name('update');
    });

    Route::controller(ContactInfoController::class)->prefix('contact-info')->name('contact-info.')->group(function() {
        Route::get('/data', 'getData')->name('get');
        Route::post('/', 'store')->name('store');
     });

     Route::get('/study-program/{studyProgramId}/lecturers', [LecturerController::class, "getStudyProgramLecturers"])
                ->name('lecturer.get-data');

    Route::post('/study-program/{studyProgramId}/contact', [StudyProgramContactController::class, "store"])
                ->name('study-program.contact.store');


    Route::controller(StudentAffairsController::class)->prefix('student')->name('student.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::post('/organizations', 'storeOrganization')->name('organizations.store');

        Route::get('/organizations', 'getOrganizations')->name('organizations.get');
        // Route::post('/organizations', 'storeOrganization')->name('organizations.store');
        // Route::get('/organizations/{organization}', 'showOrganization')->name('organizations.show');
        Route::put('/organizations/{organization}', 'updateOrganization')->name('organizations.update');
        Route::delete('/organizations/{organization}', 'deleteOrganization')->name('organizations.destroy');
        
        // // Organization officer routes
        // Route::get('/organizations/{organization}/officers', 'getOrganizationOfficers')->name('organizations.officers.get');
        // Route::post('/organizations/{organization}/officers', 'storeOrganizationOfficer')->name('organizations.officers.store');
        // Route::put('/organizations/{organization}/officers/{officer}', 'updateOrganizationOfficer')->name('organizations.officers.update');
        // Route::delete('/organizations/{organization}/officers/{officer}', 'deleteOrganizationOfficer')->name('organizations.officers.destroy');
    });
     
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
require __DIR__.'/about.php';
require __DIR__.'/home.php';
