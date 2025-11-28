<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    // ⭐ GET all colors
    public function index()
    {
        return Color::with('products')->get();
    }

    // ⭐ GET color detail
    public function show($id)
    {
        $color = Color::with('products')->find($id);

        if (!$color) {
            return response()->json(['message' => 'Color not found'], 404);
        }

        return $color;
    }

    // ⭐ CREATE new color
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:colors,name',
        ]);

        $color = Color::create($request->only(['name']));

        return response()->json([
            'message' => 'Color created successfully',
            'data' => $color
        ], 201);
    }

    // ⭐ UPDATE color
    public function update(Request $request, $id)
    {
        $color = Color::find($id);

        if (!$color) {
            return response()->json(['message' => 'Color not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|unique:colors,name,' . $id,
        ]);

        $color->update($request->only(['name']));

        return response()->json([
            'message' => 'Color updated successfully',
            'data' => $color
        ]);
    }

    // ⭐ DELETE color
    public function destroy($id)
    {
        $color = Color::find($id);

        if (!$color) {
            return response()->json(['message' => 'Color not found'], 404);
        }

        // Nếu muốn, detach các sản phẩm trước khi xóa
        $color->products()->detach();

        $color->delete();

        return response()->json(['message' => 'Color deleted successfully']);
    }
}
