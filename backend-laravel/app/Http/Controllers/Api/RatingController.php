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
        return Rating::with('user')->get();
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
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        $request->validate([
            'product_id' => 'required|integer',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        /* ================= CHECK PURCHASE ================= */
        $hasPurchased = OrderItem::where('product_id', $request->product_id)
            ->whereHas('order', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->exists();

        if (!$hasPurchased) {
            return response()->json([
                'message' => 'You can only rate a product after purchasing it.'
            ], 403);
        }

        /* ================= CHECK DUPLICATE ================= */
        $alreadyRated = Rating::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->exists();

        if ($alreadyRated) {
            return response()->json([
                'message' => 'You have already rated this product.'
            ], 409);
        }

        /* ================= CREATE ================= */
        $rating = Rating::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

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

    // ⭐ GET ratings of a single product
    public function getByProduct($productId)
    {
        $ratings = Rating::with('user')
            ->where('product_id', $productId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($ratings);
    }
}
