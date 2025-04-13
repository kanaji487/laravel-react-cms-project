<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Dashboard\UserController;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('dashboard', [UserController::class, 'getUsersData'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
