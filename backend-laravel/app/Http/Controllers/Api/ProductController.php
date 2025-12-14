<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductGallery;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // ⭐ GET all products
    public function index(Request $request)
    {
        return Product::with(['category', 'brand', 'colors', 'sizes', 'gallery'])
            ->paginate($request->get('per_page', 12));
    }

    // ⭐ GET product detail
    public function show($id)
    {
        $product = Product::with(['brand', 'category', 'colors', 'sizes', 'gallery', 'ratings'])->findOrFail($id);

        $product->views += 1;
        $product->save();

        return response()->json($product);
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

        /* ---------- Brand (MULTI) ---------- */
        if ($request->filled('brand_ids')) {
            $brandIds = is_array($request->brand_ids)
                ? $request->brand_ids
                : explode(',', $request->brand_ids);

            $products->whereIn('brand_id', $brandIds);
        }

        /* ---------- Category (MULTI) ---------- */
        if ($request->filled('category_ids')) {
            $categoryIds = is_array($request->category_ids)
                ? $request->category_ids
                : explode(',', $request->category_ids);

            $products->whereIn('category_id', $categoryIds);
        }

        /* ---------- Gender ---------- */
        if ($request->filled('gender')) {
            $products->where('gender', $request->gender);
        }

        /* ---------- Price ---------- */
        if ($request->filled('min_price')) {
            $products->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $products->where('price', '<=', $request->max_price);
        }

        /* ---------- Colors (MULTI) ---------- */
        if ($request->filled('color_ids')) {
            $colorIds = is_array($request->color_ids)
                ? $request->color_ids
                : explode(',', $request->color_ids);

            $products->whereHas('colors', function ($q) use ($colorIds) {
                $q->whereIn('colors.id', $colorIds);
            });
        }

        /* ---------- Sizes (MULTI) ---------- */
        if ($request->filled('size_ids')) {
            $sizeIds = is_array($request->size_ids)
                ? $request->size_ids
                : explode(',', $request->size_ids);

            $products->whereHas('sizes', function ($q) use ($sizeIds) {
                $q->whereIn('sizes.id', $sizeIds);
            });
        }

        /* ---------- Keyword ---------- */
        if ($request->filled('keyword')) {
            $products->where('name', 'LIKE', '%' . $request->keyword . '%');
        }

        /* ---------- LOAD RELATIONS ---------- */
        $products->with(['brand', 'category', 'colors', 'sizes', 'gallery']);

        /* ---------- NO PAGINATION (FOR COUNT) ---------- */
        if ($request->boolean('no_paginate')) {
            return response()->json([
                'data' => $products->get()
            ]);
        }

        /* ---------- PAGINATION ---------- */
        $perPage = (int) $request->get('per_page', 12);

        return response()->json(
            $products->paginate($perPage)
        );
    }

    public function related($id)
    {
        $product = Product::findOrFail($id);

        return Product::with('gallery')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $id)
            ->orderBy('id', 'DESC')
            ->take(4)
            ->get();
    }
    public function increaseView($id)
    {
        $product = Product::findOrFail($id);
        $product->increment('views');
        return response()->json(['message' => 'OK']);
    }

    // ⭐ GET top 5 products with highest average rating
    public function topRated()
    {
        $products = Product::with(['category', 'brand', 'gallery'])
            ->withAvg('ratings', 'rating')    // thêm cột ratings_avg_rating
            ->orderByDesc('ratings_avg_rating')
            ->take(5)
            ->get();

        return response()->json($products);
    }

    // ⭐ SEARCH products by name
    public function search(Request $request)
    {
        $keyword = $request->get('keyword');
        if (!$keyword || trim($keyword) === '') {
            return response()->json([
                'message' => 'Keyword is required',
                'data' => []
            ]);
        }

        $products = Product::where('name', 'LIKE', "%{$keyword}%")
            ->with(['category', 'brand', 'colors', 'sizes', 'gallery'])
            ->get();

        return response()->json($products);
    }

}
