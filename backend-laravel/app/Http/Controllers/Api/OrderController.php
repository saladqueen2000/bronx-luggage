<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\GuestUser;
use Illuminate\Support\Facades\DB;


class OrderController extends Controller
{
    public function index()
    {
        return Order::with(['items.product'])
            ->orderBy('id', 'DESC')
            ->get();
    }

    public function show($id)
    {
        return Order::with(['items.product'])
            ->findOrFail($id);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            // ================= IDENTIFY USER =================
            $user = auth()->user(); // có thể null
            $guestUserId = null;

            // Lấy guest token từ header hoặc payload
            $guestToken = $request->header('X-Guest-Token') ?? $request->input('guest_token');

            if (!$user) {
                if (!$guestToken) {
                    throw new \Exception('Guest token missing');
                }

                $guestUser = GuestUser::firstOrCreate([
                    'guest_token' => $guestToken
                ]);

                $guestUserId = $guestUser->id;
            }

            // ================= VALIDATE ITEMS =================
            if (!$request->items || count($request->items) === 0) {
                throw new \Exception('Cart is empty');
            }

            // ================= CALCULATE TOTAL =================
            $total = 0;
            foreach ($request->items as $item) {
                $total += $item['price'] * $item['quantity'];
            }

            $shipping = 5;
            $total += $shipping;

            // ================= CREATE ORDER =================
            $order = Order::create([
                'user_id' => $user?->id,
                'guest_user_id' => $guestUserId,
                'fullname' => $request->fullname,
                'email' => $request->email,
                'phonenumber' => $request->phonenumber,
                'address' => $request->address,
                'note' => $request->note,
                'status' => 'pending',
                'total_amount' => $total,
            ]);

            // ================= ORDER ITEMS =================
            foreach ($request->items as $item) {
                $order->items()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'color' => $item['color'] ?? null,
                    'size' => $item['size'] ?? null,
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load('items.product')
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }


    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $data = $request->validate([
            'status' => 'nullable|string',
            'address' => 'nullable|string|max:255',
        ]);

        $order->update($data);

        return response()->json([
            'message' => 'Order updated successfully',
            'order' => $order->load('items.product')
        ]);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);

        // Xoá order -> order_items bị xoá theo (cascade)
        $order->delete();

        return response()->json([
            'message' => 'Order deleted successfully'
        ]);
    }
}
