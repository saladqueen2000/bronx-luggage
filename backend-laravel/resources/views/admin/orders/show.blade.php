@extends('adminlte::page')

@section('title', 'Order Detail')

@section('content_header')
    <h1>Order Detail</h1>
@stop

@section('content')
{{--Order Infomation--}}
<h4>Order #{{ $order->id }}</h4>

<p><strong>User:</strong> {{ $order->user->name ?? '-' }}</p>
<p><strong>Status:</strong> {{ ucfirst($order->status) }}</p>
<p><strong>Total Price:</strong> ${{ $order->total_price }}</p>


{{--Order Items--}}
<h4>Order Items</h4>
<table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    </thead>

    <tbody>
        @foreach($order->items as $item)
        <tr>
            <td>{{ $item->id }}</td>
            <td>{{ $item->product->name ?? '-' }}</td>
            <td>{{ $item->quantity }}</td>
            <td>${{ $item->price }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
@stop
