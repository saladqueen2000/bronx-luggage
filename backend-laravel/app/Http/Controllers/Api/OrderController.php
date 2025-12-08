<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;

class OrderController extends Controller
{

    public function index()
    {
        return Order::with('items.product')
            ->orderBy('id', 'DESC')
            ->get();
    }


    public function show($id)
    {
        return Order::with('items.product')
            ->findOrFail($id);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',

            'items' => 'required|array|min:1',

            'items.*.product_id' => 'required|exists:products,id',
            'items.*.color' => 'nullable|string',
            'items.*.size' => 'nullable|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        // Tính tổng tiền
        $total = collect($data['items'])
            ->sum(fn($item) => $item['price'] * $item['quantity']);

        // Tạo order
        $order = Order::create([
            'user_id' => $data['user_id'],
            'total_amount' => $total,
            'status' => 'pending',
        ]);

        // Tạo order items
        foreach ($data['items'] as $item) {
            $order->items()->create($item);
        }

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order->load('items.product')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $data = $request->validate([
            'status' => 'required|string'
        ]);

        $order->update($data);

        return response()->json([
            'message' => 'Order updated successfully',
            'order' => $order
        ]);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);

        $order->delete(); // order_items tự xoá nhờ ON DELETE CASCADE

        return response()->json([
            'message' => 'Order deleted successfully'
        ]);
    }
}
