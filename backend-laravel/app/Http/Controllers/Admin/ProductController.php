<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Color;
use App\Models\Size;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['category', 'brand', 'colors', 'sizes', 'gallery'])->get();
        return view('admin.products.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        $brands = Brand::all();
        $colors = Color::all();
        $sizes = Size::all();
        return view('admin.products.create', compact('categories', 'brands', 'colors', 'sizes'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'gender' => 'required|in:male,female,unisex',
            'colors' => 'array',
            'sizes' => 'array',
        ]);

        $product = Product::create($request->only(['category_id', 'brand_id', 'name', 'description', 'price', 'gender']));

        // Colors
        if ($request->has('colors')) {
            $product->colors()->sync($request->colors);
        }

        // Sizes
        if ($request->has('sizes')) {
            $product->sizes()->sync($request->sizes);
        }

        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $categories = Category::all();
        $brands = Brand::all();
        $colors = Color::all();
        $sizes = Size::all();
        return view('admin.products.edit', compact('product', 'categories', 'brands', 'colors', 'sizes'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'gender' => 'required|in:male,female,unisex',
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->only([
            'category_id',
            'brand_id',
            'name',
            'description',
            'price',
            'gender'
        ]));

        // Update colors
        $product->colors()->sync($request->colors ?? []);

        // Update sizes
        $product->sizes()->sync($request->sizes ?? []);

        return redirect()->route('products.index')->with('success', 'Product updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Product::findOrFail($id)->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully!');
    }

    public function related($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $related = Product::with(['gallery'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $id)
            ->limit(8)
            ->get();

        return response()->json($related);
    }
}
