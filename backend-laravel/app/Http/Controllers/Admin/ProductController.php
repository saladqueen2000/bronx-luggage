<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
    }
}
