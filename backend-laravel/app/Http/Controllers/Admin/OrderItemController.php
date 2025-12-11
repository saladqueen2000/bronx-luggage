<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;

class OrderItemController extends Controller
{
    public function index()
    {
        $items = OrderItem::with(['product', 'order'])->get();
        return view('admin.order_items.index', compact('items'));
    }

    public function show($id)
    {
        $item = OrderItem::with(['product', 'order'])->findOrFail($id);
        return view('admin.order_items.show', compact('item'));
    }

    public function destroy($id)
    {
        OrderItem::findOrFail($id)->delete();

        return redirect()->route('order-items.index')
            ->with('success', 'Order item deleted');
    }
}
