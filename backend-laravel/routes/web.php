<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', fn() => view('welcome'));
// Route::get('/home', fn() => redirect('/admin'));

// // Dashboard
// Route::get('/admin', fn() => view('admin.dashboard'));

// // Products
// Route::get('/admin/products', fn() => view('admin.products.index'));
// Route::get('/admin/products/create', fn() => view('admin.products.create'));
// Route::get('/admin/products/edit', fn() => view('admin.products.edit'));

// // Categories
// Route::get('/admin/categories', fn() => view('admin.categories.index'));
// Route::get('/admin/categories/create', fn() => view('admin.categories.create'));
// Route::get('/admin/categories/edit', fn() => view('admin.categories.edit'));

// // Brands
// Route::get('/admin/brands', fn() => view('admin.brands.index'));
// Route::get('/admin/brands/create', fn() => view('admin.brands.create'));
// Route::get('/admin/brands/edit', fn() => view('admin.brands.edit'));

// // Colors
// Route::get('/admin/colors', fn() => view('admin.colors.index'));
// Route::get('/admin/colors/create', fn() => view('admin.colors.create'));
// Route::get('/admin/colors/edit', fn() => view('admin.colors.edit'));

// // Sizes
// Route::get('/admin/sizes', fn() => view('admin.sizes.index'));
// Route::get('/admin/sizes/create', fn() => view('admin.sizes.create'));
// Route::get('/admin/sizes/edit', fn() => view('admin.sizes.edit'));

// // Orders
// Route::get('/admin/orders', fn() => view('admin.orders.index'));
// Route::get('/admin/orders/show', fn() => view('admin.orders.show'));

// // Order Items
// Route::get('/admin/order-items', fn() => view('admin.order_items.index'));

// // Users
// Route::get('/admin/users', fn() => view('admin.users.index'));

// // Ratings
// Route::get('/admin/ratings', fn() => view('admin.ratings.index'));

Route::prefix('admin')->group(function () {
    Route::get('/products', [\App\Http\Controllers\Admin\ProductController::class, 'index']);
    Route::get('/products/create', [\App\Http\Controllers\Admin\ProductController::class, 'create']);
    Route::post('/products', [\App\Http\Controllers\Admin\ProductController::class, 'store']);
    Route::get('/products/edit/{id}', [\App\Http\Controllers\Admin\ProductController::class, 'edit']);
    Route::put('/products/{id}', [\App\Http\Controllers\Admin\ProductController::class, 'update']);
    Route::delete('/products/{id}', [\App\Http\Controllers\Admin\ProductController::class, 'destroy']);
    Route::delete('/products/gallery/{id}', [\App\Http\Controllers\Admin\ProductController::class, 'deleteGallery'])
        ->name('admin.products.gallery.delete');
});
