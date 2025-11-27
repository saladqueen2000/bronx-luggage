<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', function () {
    return redirect('/admin');
});

// Dashboard
Route::get('/admin', function () {
    return view('admin.dashboard');
});

// Products
Route::get('/admin/products', function () {
    return view('admin.products.index');
});
Route::get('/admin/products/create', function () {
    return view('admin.products.create');
});
Route::get('/admin/products/edit', function () {
    return view('admin.products.edit');
});

// Categories
Route::get('/admin/categories', function () {
    return view('admin.categories.index');
});

// Brands
Route::get('/admin/brands', function () {
    return view('admin.brands.index');
});

// Colors
Route::get('/admin/colors', function () {
    return view('admin.colors.index');
});

// Sizes
Route::get('/admin/sizes', function () {
    return view('admin.sizes.index');
});

// Orders
Route::get('/admin/orders', function () {
    return view('admin.orders.index');
});
Route::get('/admin/orders/show', function () {
    return view('admin.orders.show');
});

// Order Items
Route::get('/admin/order-items', function () {
    return view('admin.order_items.index');
});

// Users
Route::get('/admin/users', function () {
    return view('admin.users.index');
});

// Ratings
Route::get('/admin/ratings', function () {
    return view('admin.ratings.index');
});
