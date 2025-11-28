<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductGallery;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // ⭐ GET all products
    public function index()
    {
        return Product::with(['category', 'brand', 'colors', 'sizes', 'gallery'])->get();
    }

    // ⭐ GET product detail
    public function show($id)
    {
        $product = Product::with(['category', 'brand', 'colors', 'sizes', 'gallery'])
                          ->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return $product;
    }

    // ⭐ CREATE new product
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'brand_id' => 'required',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'gender' => 'required|string',

            'colors' => 'array',
            'sizes' => 'array',
            'gallery' => 'array'
        ]);

        $product = Product::create($request->only([
            'category_id',
            'brand_id',
            'name',
            'description',
            'price',
            'gender'
        ]));

        // Gán colors (Many-to-many)
        if ($request->has('colors')) {
            $product->colors()->sync($request->colors);
        }

        // Gán sizes (Many-to-many)
        if ($request->has('sizes')) {
            $product->sizes()->sync($request->sizes);
        }

        // Thêm gallery (1-n)
        if ($request->has('gallery')) {
            foreach ($request->gallery as $url) {
                ProductGallery::create([
                    'product_id' => $product->id,
                    'image_url' => $url
                ]);
            }
        }

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product->load(['colors', 'sizes', 'gallery'])
        ], 201);
    }

    // ⭐ UPDATE product
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->update($request->only([
            'category_id',
            'brand_id',
            'name',
            'description',
            'price',
            'gender'
        ]));

        // Update colors
        if ($request->has('colors')) {
            $product->colors()->sync($request->colors);
        }

        // Update sizes
        if ($request->has('sizes')) {
            $product->sizes()->sync($request->sizes);
        }

        // Update gallery
        if ($request->has('gallery')) {
            ProductGallery::where('product_id', $product->id)->delete();

            foreach ($request->gallery as $url) {
                ProductGallery::create([
                    'product_id' => $product->id,
                    'image_url' => $url
                ]);
            }
        }

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product->load(['colors', 'sizes', 'gallery'])
        ]);
    }

    // ⭐ DELETE product
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Xóa quan hệ
        $product->colors()->detach();
        $product->sizes()->detach();
        ProductGallery::where('product_id', $product->id)->delete();

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function filter(Request $request)
{
    $products = Product::query();

    // Filter by brand
    if ($request->brand_id) {
        $products->where('brand_id', $request->brand_id);
    }

    // Filter by category
    if ($request->category_id) {
        $products->where('category_id', $request->category_id);
    }

    // Filter by price range
    if ($request->min_price) {
        $products->where('price', '>=', $request->min_price);
    }

    if ($request->max_price) {
        $products->where('price', '<=', $request->max_price);
    }

    // Filter by multiple colors
    if ($request->color_ids) {
        $products->whereHas('colors', function ($q) use ($request) {
            $q->whereIn('colors.id', $request->color_ids);
        });
    }

    // Filter by multiple sizes
    if ($request->size_ids) {
        $products->whereHas('sizes', function ($q) use ($request) {
            $q->whereIn('sizes.id', $request->size_ids);
        });
    }

    // Search by product name
    if ($request->keyword) {
        $products->where('name', 'LIKE', '%' . $request->keyword . '%');
    }

    // Load relationships
    $products = $products->with(['brand', 'category', 'colors', 'sizes', 'gallery'])->get();

    return response()->json($products);
}

}
