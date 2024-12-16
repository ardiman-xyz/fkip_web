<?php

use App\Http\Controllers\UploadMinio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/minio-uploads", [UploadMinio::class, "upload"])->name("upload.minio");
