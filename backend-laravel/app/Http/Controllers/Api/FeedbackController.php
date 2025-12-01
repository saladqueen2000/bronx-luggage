<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    // ⭐ GET all feedbacks (admin only)
    public function index()
    {
        return Feedback::all();
    }

    // ⭐ GET feedback detail (admin only)
    public function show($id)
    {
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        return $feedback;
    }

    // ⭐ CREATE new feedback (user)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string'
        ]);

        $feedback = Feedback::create($request->only(['name', 'email', 'message']));

        return response()->json([
            'message' => 'Feedback submitted successfully',
            'data' => $feedback
        ], 201);
    }

    // ⭐ DELETE feedback (admin only)
    public function destroy($id)
    {
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        $feedback->delete();

        return response()->json(['message' => 'Feedback deleted successfully']);
    }
}
