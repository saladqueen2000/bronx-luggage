<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    // ⭐ GET all brands
    public function index()
    {
        return Brand::with('products')->get();
    }

    // ⭐ GET brand detail
    public function show($id)
    {
        $brand = Brand::with('products')->find($id);

        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }

        return $brand;
    }

    // ⭐ CREATE new brand
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:brands,name',
            'description' => 'nullable|string',
            'logo' => 'nullable|string'
        ]);

        $brand = Brand::create($request->only(['name', 'description', 'logo']));

        return response()->json([
            'message' => 'Brand created successfully',
            'data' => $brand
        ], 201);
    }

    // ⭐ UPDATE brand
    public function update(Request $request, $id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }

        $request->validate([
            'name' => 'string|unique:brands,name,' . $id,
            'description' => 'nullable|string',
            'logo' => 'nullable|string'
        ]);

        $brand->update($request->only(['name', 'description', 'logo']));

        return response()->json([
            'message' => 'Brand updated successfully',
            'data' => $brand
        ]);
    }

    // ⭐ DELETE brand
    public function destroy($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }

        // Xóa brand nhưng không xóa sản phẩm (tùy nhu cầu)
        // $brand->products()->delete(); // nếu muốn cascade delete

        $brand->delete();

        return response()->json(['message' => 'Brand deleted successfully']);
    }
}
