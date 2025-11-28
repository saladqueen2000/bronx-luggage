<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    // ⭐ GET all sizes
    public function index()
    {
        return Size::with('products')->get();
    }

    // ⭐ GET size detail
    public function show($id)
    {
        $size = Size::with('products')->find($id);

        if (!$size) {
            return response()->json(['message' => 'Size not found'], 404);
        }

        return $size;
    }

    // ⭐ CREATE new size
    public function store(Request $request)
    {
        $request->validate([
            'label' => 'required|string|unique:sizes,label',
        ]);

        $size = Size::create($request->only(['label']));

        return response()->json([
            'message' => 'Size created successfully',
            'data' => $size
        ], 201);
    }

    // ⭐ UPDATE size
    public function update(Request $request, $id)
    {
        $size = Size::find($id);

        if (!$size) {
            return response()->json(['message' => 'Size not found'], 404);
        }

        $request->validate([
            'label' => 'required|string|unique:sizes,label,' . $id,
        ]);

        $size->update($request->only(['label']));

        return response()->json([
            'message' => 'Size updated successfully',
            'data' => $size
        ]);
    }

    // ⭐ DELETE size
    public function destroy($id)
    {
        $size = Size::find($id);

        if (!$size) {
            return response()->json(['message' => 'Size not found'], 404);
        }

        // Nếu muốn, detach các sản phẩm trước khi xóa
        $size->products()->detach();

        $size->delete();

        return response()->json(['message' => 'Size deleted successfully']);
    }
}
