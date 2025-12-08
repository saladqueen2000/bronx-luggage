<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductGallery;
use Illuminate\Http\Request;

class ProductGalleryController extends Controller
{
    public function store(Request $request, $productId)
    {
        $request->validate([
            'images.*' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        foreach ($request->file('images') as $img) {

            $path = $img->store('products', 'public');

            ProductGallery::create([
                'product_id' => $productId,
                'image_url' => '/storage/' . $path
            ]);
        }

        return back()->with('success', 'Images uploaded successfully!');
    }

    public function destroy($id)
    {
        $gallery = ProductGallery::findOrFail($id);

        $filePath  = public_path($gallery->image_url);
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $gallery->delete();

        return back()->with('success', 'Image deleted!');
    }
}
