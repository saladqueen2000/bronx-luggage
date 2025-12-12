<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    // ⭐ GET all ratings (admin only)
    public function index()
    {
        return Rating::with(['user', 'product'])->get();
    }

    // ⭐ GET rating detail
    public function show($id)
    {
        $rating = Rating::with(['user', 'product'])->find($id);

        if (!$rating) {
            return response()->json(['message' => 'Rating not found'], 404);
        }

        return $rating;
    }

    // ⭐ CREATE new rating (user only)
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'product_id' => 'required|integer',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        // Kiểm tra user đã mua sản phẩm chưa
        $hasPurchased = OrderItem::whereHas('order', function ($q) use ($request) {
            $q->where('user_id', $request->user_id);
        })->where('product_id', $request->product_id)->exists();

        if (!$hasPurchased) {
            return response()->json([
                'message' => 'You can only rate a product after purchasing it.'
            ], 403);
        }

        // Kiểm tra user đã rating chưa
        $alreadyRated = Rating::where('user_id', $request->user_id)
            ->where('product_id', $request->product_id)
            ->exists();

        if ($alreadyRated) {
            return response()->json(['message' => 'You have already rated this product.'], 409);
        }

        $rating = Rating::create($request->only(['user_id', 'product_id', 'rating', 'comment']));

        return response()->json([
            'message' => 'Rating submitted successfully',
            'data' => $rating
        ], 201);
    }

    // ⭐ UPDATE rating (admin only)
    public function update(Request $request, $id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return response()->json(['message' => 'Rating not found'], 404);
        }

        $request->validate([
            'rating' => 'integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $rating->update($request->only(['rating', 'comment']));

        return response()->json([
            'message' => 'Rating updated successfully',
            'data' => $rating
        ]);
    }

    // ⭐ DELETE rating (admin only)
    public function destroy($id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return response()->json(['message' => 'Rating not found'], 404);
        }

        $rating->delete();

        return response()->json(['message' => 'Rating deleted successfully']);
    }

    public function getByProduct($id)
    {
        $ratings = Rating::with('user')
            ->where('product_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($ratings);
    }
}
