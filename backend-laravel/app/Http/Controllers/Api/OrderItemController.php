<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{

    public function index()
    {
        return OrderItem::with('product')->get();
    }

    public function byOrder($orderId)
    {
        return OrderItem::with('product')
            ->where('order_id', $orderId)
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'color' => 'nullable|string|max:50',
            'size' => 'nullable|string|max:50',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        $item = OrderItem::create($data);

        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $item = OrderItem::findOrFail($id);

        $data = $request->validate([
            'color' => 'sometimes|string|max:50',
            'size' => 'sometimes|string|max:50',
            'quantity' => 'sometimes|integer|min:1',
            'price' => 'sometimes|numeric|min:0',
        ]);

        $item->update($data);

        return $item;
    }

    public function destroy($id)
    {
        $item = OrderItem::findOrFail($id);
        $item->delete();

        return response()->json(['message' => 'Item deleted']);
    }
}
