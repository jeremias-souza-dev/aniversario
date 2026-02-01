<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GiftController;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__ . '/auth.php';

Route::middleware('auth')->group(function () {
    Route::get('/completar-cadastro', [App\Http\Controllers\GuestInfoController::class, 'create'])->name('guest.info.create');
    Route::post('/completar-cadastro', [App\Http\Controllers\GuestInfoController::class, 'store'])->name('guest.info.store');

    Route::middleware([\App\Http\Middleware\EnsureGuestInfoCompleted::class])->group(function () {
        Route::get('/', [GiftController::class, 'index'])->name('gifts.index');
        Route::get('/presentes', [GiftController::class, 'index'])->name('gifts.index');
        Route::post('/presentes/reservar', [GiftController::class, 'reserve'])->name('gifts.reserve');
    });
});


//
Route::get('/logout-test', function () {
    auth()->logout();
    return redirect('/');
});
