<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('settings/profile/{id}/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::match(['patch', 'post'], '/settings/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    Route::get('settings/role', [RoleController::class, 'index'])->name('role.index');
    Route::get('/settings/role/create', [RoleController::class, 'create'])->name('roles.create');
    Route::post('settings/role/create', [RoleController::class, 'store'])->name('roles.store');
});
