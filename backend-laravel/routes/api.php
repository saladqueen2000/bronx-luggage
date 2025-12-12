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
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderItemController;
Route::prefix('products')->group(function () {
    Route::get('filter', [ProductController::class, 'filter']);
});

Route::get('/products/{id}/related', [ProductController::class, 'related']);
Route::get('/products/{id}/ratings', [RatingController::class, 'getByProduct']);

Route::apiResource('products', ProductController::class)->names([
    'index' => 'api.products.index',
    'store' => 'api.products.store',
    'show' => 'api.products.show',
    'update' => 'api.products.update',
    'destroy' => 'api.products.destroy'
]);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/products/{id}/increase-view', [ProductController::class, 'increaseView']);


Route::apiResource('users', UserController::class);
Route::apiResource('brands', BrandController::class);
Route::apiResource('colors', ColorController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('feedbacks', FeedbackController::class);
Route::apiResource('galleries', GalleryController::class);
Route::apiResource('sizes', SizeController::class);
Route::apiResource('ratings', RatingController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('orderItems', OrderItemController::class);




Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);







