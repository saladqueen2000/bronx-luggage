<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductGalleryController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ColorController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\OrderItemController;
use App\Http\Controllers\Admin\RatingController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AuthController;

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return redirect()->route('admin.dashboard');
});

/*
|--------------------------------------------------------------------------
| Admin Auth
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->group(function () {
    Route::get('login', [AuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('login', [AuthController::class, 'login'])->name('admin.login.submit');
    Route::post('logout', [AuthController::class, 'logout'])->name('admin.logout');
});


/*
|--------------------------------------------------------------------------
| Admin Protected Routes
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->middleware('admin')->group(function () {

    // Dashboard
    Route::get('/', fn () => view('admin.dashboard'))
        ->name('admin.dashboard');

    // CRUD
    Route::resource('products', ProductController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('brands', BrandController::class);
    Route::resource('colors', ColorController::class);
    Route::resource('sizes', SizeController::class);

    Route::resource('orders', OrderController::class)
        ->only(['index', 'show', 'edit', 'update', 'destroy']);

    Route::resource('order-items', OrderItemController::class)
        ->only(['index', 'show', 'destroy']);

    Route::resource('ratings', RatingController::class)
        ->only(['index', 'show', 'destroy']);

    Route::resource('users', UserController::class)
        ->only(['index', 'show', 'destroy']);

    Route::post('products/{id}/gallery', [ProductGalleryController::class, 'store'])
        ->name('products.gallery.store');

    Route::delete('gallery/{id}', [ProductGalleryController::class, 'destroy'])
        ->name('products.gallery.delete');
});
