<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StorefrontController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register'])->middleware('throttle:10,1');
Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
Route::middleware('customer')->prefix('auth')->group(function (): void {
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/orders', [AuthController::class, 'orders']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/password', [AuthController::class, 'updatePassword']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/products', [StorefrontController::class, 'products']);
Route::get('/collections', [StorefrontController::class, 'collections']);
Route::get('/settings', [StorefrontController::class, 'settings']);
Route::get('/content', [StorefrontController::class, 'content']);
Route::post('/orders', [StorefrontController::class, 'orders'])->middleware(['throttle:60,1', 'customer:optional']);
