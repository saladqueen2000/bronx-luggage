<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\GuestUser;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /* ================= LOGIN ================= */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        // Merge guest orders nếu có guest token từ header hoặc payload
        $this->mergeGuestOrders($request, $user);

        return response()->json([
            'message' => 'Login successfully',
            'token' => $token,
            'user' => $user
        ]);
    }

    /* ================= REGISTER ================= */
    public function register(Request $request)
    {
        $data = $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        DB::beginTransaction();

        try {
            $user = User::create([
                'fullname' => $data['fullname'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            DB::commit();

        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Register failed',
                'error' => $e->getMessage()
            ], 500);
        }

        // Merge guest orders nếu có guest token
        $this->mergeGuestOrders($request, $user);

        return response()->json([
            'message' => 'Register successfully',
            'token' => $token,
            'user' => $user
        ], 201);
    }

    /* ================= MERGE GUEST ================= */
    private function mergeGuestOrders(Request $request, User $user): void
    {
        try {
            // Lấy guest token từ header hoặc payload để đảm bảo nhận được
            $guestToken = $request->header('X-Guest-Token') ?? $request->input('guest_token');
            if (!$guestToken)
                return;

            $guestUser = GuestUser::where('guest_token', $guestToken)->first();
            if (!$guestUser)
                return;

            // Cập nhật tất cả order của guest sang user vừa login/register
            Order::where('guest_user_id', $guestUser->id)
                ->update([
                    'user_id' => $user->id,
                    'guest_user_id' => null
                ]);

            // Xóa guest user cũ
            $guestUser->delete();

        } catch (\Throwable $e) {
            logger()->warning('Guest merge failed', [
                'error' => $e->getMessage()
            ]);
        }
    }
}
