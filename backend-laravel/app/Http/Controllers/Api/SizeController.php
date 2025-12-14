<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    // ⭐ GET all sizes + product count
    public function index()
    {
        return Size::withCount('products')
            ->get()
            ->map(function ($size) {
                return [
                    'id' => $size->id,
                    'label' => $size->label,
                    'count' => $size->products_count,
                ];
            });
    }

    // ⭐ GET size detail + product count
    public function show($id)
    {
        $size = Size::withCount('products')->find($id);

        if (!$size) {
            return response()->json(['message' => 'Size not found'], 404);
        }

        return [
            'id' => $size->id,
            'label' => $size->label,
            'count' => $size->products_count,
        ];
    }

    // ⭐ CREATE new size
    public function store(Request $request)
    {
        $request->validate([
            'label' => 'required|string|unique:sizes,label',
        ]);

        $size = Size::create([
            'label' => $request->label
        ]);

        return response()->json([
            'message' => 'Size created successfully',
            'data' => [
                'id' => $size->id,
                'label' => $size->label,
                'count' => 0
            ]
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

        $size->update([
            'label' => $request->label
        ]);

        return response()->json([
            'message' => 'Size updated successfully',
            'data' => [
                'id' => $size->id,
                'label' => $size->label,
                'count' => $size->products()->count()
            ]
        ]);
    }

    // ⭐ DELETE size
    public function destroy($id)
    {
        $size = Size::find($id);

        if (!$size) {
            return response()->json(['message' => 'Size not found'], 404);
        }

        $size->products()->detach();
        $size->delete();

        return response()->json(['message' => 'Size deleted successfully']);
    }
}
