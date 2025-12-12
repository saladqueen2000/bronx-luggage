<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function index()
    {
        $ratings = Rating::with(['user', 'product'])->latest()->get();
        return view('admin.ratings.index', compact('ratings'));
    }

    public function show($id)
    {
        $rating = Rating::with(['user', 'product'])->findOrFail($id);
        return view('admin.ratings.show', compact('rating'));
    }

    public function destroy($id)
    {
        Rating::findOrFail($id)->delete();
        return redirect()
            ->route('ratings.index')
            ->with('success', 'Rating deleted successfully!');
    }
}
