<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\Content\ContentController;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('dashboard', [UserController::class, 'getUsersData'])->name('dashboard');

    Route::get('content', [ContentController::class, 'getContentData'])->name('content');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
