<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactInfoController;
use App\Http\Controllers\DefaultSliderController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UploadMinio;
use App\Http\Controllers\WelcomeController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;



Route::get("/berita", [WelcomeController::class, "detailBerita"]);

//Route::get('/test-rabbitmq', function() {
//    try {
//        // Test koneksi
//        $connection = new AMQPStreamConnection(
//            'shared_rabbitmq',
//            5672,
//            'admin',
//            'admin123'
//        );
//
//        $channel = $connection->channel();
//
//        // Coba baca message
//        $channel->queue_declare('fkip.notifications', false, true, false, false);
//
//        $msg = new AMQPMessage('Test message from FKIP');
//        $channel->basic_publish($msg, '', 'fkip.notifications');
//
//        $channel->close();
//        $connection->close();
//
//        return response()->json([
//            'success' => true,
//            'message' => 'RabbitMQ connection successful!'
//        ]);
//
//    } catch (\Exception $e) {
//        return response()->json([
//            'success' => false,
//            'message' => 'Failed to connect: ' . $e->getMessage()
//        ], 500);
//    }
//});

Route::get('/', [WelcomeController::class, "index"])->name("welcome");
Route::get('berita/{slug}', [WelcomeController::class, "newsDetail"])->name("news.detail");
Route::get('/agenda/{slug}', [WelcomeController::class, 'eventDetail'])->name('event.detail');



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

    Route::controller(ContactInfoController::class)->prefix('contact-info')->name('contact-info.')->group(function() {
        Route::get('/data', 'getData')->name('get');
        Route::post('/', 'store')->name('store');
     });
     
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
require __DIR__.'/about.php';
