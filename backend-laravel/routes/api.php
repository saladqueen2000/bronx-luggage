<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    ProductController,
    UserController,
    BrandController,
    ColorController,
    CategoryController,
    FeedbackController,
    GalleryController,
    RatingController,
    SizeController,
    AuthController,
    OrderController,
    OrderItemController
};

/* ================= AUTH ================= */
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/* ================= PRODUCTS ================= */
Route::prefix('products')->group(function () {
    Route::get('filter', [ProductController::class, 'filter']);
    Route::get('search', [ProductController::class, 'search']);
    Route::get('top-rated', [ProductController::class, 'topRated']);
    Route::post('{id}/increase-view', [ProductController::class, 'increaseView']);
    Route::get('{id}/related', [ProductController::class, 'related']);
    Route::get('{id}/ratings', [RatingController::class, 'getByProduct']);
});

Route::apiResource('products', ProductController::class)
    ->names([
        'index' => 'api.products.index',
        'store' => 'api.products.store',
        'show' => 'api.products.show',
        'update' => 'api.products.update',
        'destroy' => 'api.products.destroy'
    ]);

/* ================= RATINGS ================= */
Route::middleware('auth:sanctum')->post('/ratings', [RatingController::class, 'store']);

/* ================= ORDERS ================= */
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
});

Route::apiResource('orders', OrderController::class);
Route::apiResource('orderItems', OrderItemController::class);

/* ================= RESOURCES ================= */
Route::apiResources([
    'users' => UserController::class,
    'brands' => BrandController::class,
    'colors' => ColorController::class,
    'categories' => CategoryController::class,
    'feedbacks' => FeedbackController::class,
    'galleries' => GalleryController::class,
    'sizes' => SizeController::class,
]);
