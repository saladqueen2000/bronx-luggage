<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FeedbackController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\SizeController;
use App\Http\Controllers\Api\OrderItemController;
use App\Http\Controllers\Api\OrderController;

Route::prefix('products')->group(function () {
    Route::get('filter', [ProductController::class, 'filter']);
});

Route::apiResource('products', ProductController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('brands', BrandController::class);
Route::apiResource('colors', ColorController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('feedbacks', FeedbackController::class);
Route::apiResource('galleries', GalleryController::class);
Route::apiResource('sizes', SizeController::class);
Route::apiResource('ratings', RatingController::class);
Route::apiResource('orderitems', OrderItemController::class);
Route::apiResource('orders', OrderController::class);



