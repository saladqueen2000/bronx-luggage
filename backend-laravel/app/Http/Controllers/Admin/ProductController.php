<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
<<<<<<< HEAD
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Size;
use App\Models\ProductGallery;

class ProductController extends Controller
{
    // List products
    public function index()
    {
        $products = Product::with(['brand', 'category'])->get();
        return view('admin.products.index', compact('products'));
    }

    // Show create form
    public function create()
    {
        $brands = Brand::all();
        $categories = Category::all();
        $colors = Color::all();
        $sizes = Size::all();
        return view('admin.products.create', compact('brands', 'categories', 'colors', 'sizes'));
    }

    // Store new product
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'brand_id' => 'required',
            'category_id' => 'required',
        ]);

        $product = Product::create($request->only('name', 'price', 'brand_id', 'category_id', 'description', 'gender'));

        // Many-to-many
        if ($request->colors)
            $product->colors()->sync($request->colors);
        if ($request->sizes)
            $product->sizes()->sync($request->sizes);

        // Gallery
        if ($request->hasFile('gallery')) {
            if (isset($product)) {
                ProductGallery::where('product_id', $product->id)->delete();
            }

            foreach ($request->file('gallery') as $file) {
                $path = $file->store('products', 'public');
                ProductGallery::create([
                    'product_id' => $product->id,
                    'image_url' => $path
                ]);
            }
        }


        return redirect('/admin/products')->with('success', 'Product created successfully.');
    }

    // Show edit form
    public function edit($id)
    {
        $product = Product::with(['colors', 'sizes', 'gallery'])->findOrFail($id);
        $brands = Brand::all();
        $categories = Category::all();
        $colors = Color::all();
        $sizes = Size::all();
        return view('admin.products.edit', compact('product', 'brands', 'categories', 'colors', 'sizes'));
    }

    // Update product
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->only(['name', 'price', 'brand_id', 'category_id']));

        // update colors & sizes
        $product->colors()->sync($request->colors ?? []);
        $product->sizes()->sync($request->sizes ?? []);

        // upload new gallery images
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('products', 'public');
                ProductGallery::create([
                    'product_id' => $product->id,
                    'image_url' => $path
                ]);
            }
        }

        return redirect('/admin/products')->with('success', 'Product updated successfully');
    }


    // Delete product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->colors()->detach();
        $product->sizes()->detach();
        ProductGallery::where('product_id', $product->id)->delete();
        $product->delete();

        return redirect('/admin/products')->with('success', 'Product deleted successfully.');
    }

    public function deleteGallery($id)
    {
        $img = ProductGallery::findOrFail($id);

        // Xóa file trong storage
        if (\Storage::disk('public')->exists($img->image_url)) {
            \Storage::disk('public')->delete($img->image_url);
        }

        $img->delete();

        return back()->with('success', 'Image deleted successfully');
=======
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
            'category_id', 'brand_id', 'name', 'description', 'price', 'gender'
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
>>>>>>> a61dc8f4b37a9aa1aab088e033c986af834abfed
    }
}
