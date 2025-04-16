<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\Content\ContentController;
use App\Http\Controllers\Content\Category\CategoryController;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('dashboard', [UserController::class, 'getUsersData'])->name('dashboard');

    Route::get('content', [ContentController::class, 'getContentData'])->name('content');

    Route::get('content/category/list', [CategoryController::class, 'index'])->name('category.list');
    Route::get('content/category/create', [CategoryController::class, 'form'])->name('category.create');
    Route::post('/content/category/create', [CategoryController::class, 'create']);
    Route::delete('/content/category/{id}', [CategoryController::class, 'destroy']);
    Route::get('/content/category/{id}/edit', [CategoryController::class, 'edit'])->name('category.edit');
    Route::put('/content/category/{id}', [CategoryController::class, 'update'])->name('category.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
