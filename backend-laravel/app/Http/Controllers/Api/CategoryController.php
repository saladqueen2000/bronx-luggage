<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // ⭐ GET all categories
    public function index()
    {
        return Category::with('products')->get();
    }

    // ⭐ GET category detail
    public function show($id)
    {
        $category = Category::with('products')->find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return $category;
    }

    // ⭐ CREATE new category
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name',
            'gender' => 'required|string'
        ]);

        $category = Category::create($request->only(['name', 'gender']));

        return response()->json([
            'message' => 'Category created successfully',
            'data' => $category
        ], 201);
    }

    // ⭐ UPDATE category
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $request->validate([
            'name' => 'string|unique:categories,name,' . $id,
        ]);

        $category->update($request->only(['name']));

        return response()->json([
            'message' => 'Category updated successfully',
            'data' => $category
        ]);
    }

    // ⭐ DELETE category
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // Xóa category nhưng không xóa sản phẩm (tùy nhu cầu)
        // $category->products()->delete();

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
