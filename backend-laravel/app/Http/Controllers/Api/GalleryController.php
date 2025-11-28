<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductGallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    // ⭐ GET all galleries (optionally by product_id)
    public function index(Request $request)
    {
        $query = ProductGallery::query();

        if ($request->has('product_id')) {
            $query->where('product_id', $request->product_id);
        }

        return $query->get();
    }

    // ⭐ GET gallery detail
    public function show($id)
    {
        $gallery = ProductGallery::find($id);

        if (!$gallery) {
            return response()->json(['message' => 'Gallery not found'], 404);
        }

        return $gallery;
    }

    // ⭐ CREATE new gallery image
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'image_url' => 'required|string' // hoặc file upload xử lý sau
        ]);

        $gallery = ProductGallery::create($request->only(['product_id', 'image_url']));

        return response()->json([
            'message' => 'Gallery image added successfully',
            'data' => $gallery
        ], 201);
    }

    // ⭐ UPDATE gallery image
    public function update(Request $request, $id)
    {
        $gallery = ProductGallery::find($id);

        if (!$gallery) {
            return response()->json(['message' => 'Gallery not found'], 404);
        }

        $request->validate([
            'image_url' => 'required|string'
        ]);

        $gallery->update($request->only(['image_url']));

        return response()->json([
            'message' => 'Gallery updated successfully',
            'data' => $gallery
        ]);
    }

    // ⭐ DELETE gallery image
    public function destroy($id)
    {
        $gallery = ProductGallery::find($id);

        if (!$gallery) {
            return response()->json(['message' => 'Gallery not found'], 404);
        }

        $gallery->delete();

        return response()->json(['message' => 'Gallery deleted successfully']);
    }
}
