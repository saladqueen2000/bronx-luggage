@extends('adminlte::page')

@section('title', 'Order Item Detail')

@section('content_header')
    <h1>Order Item Detail</h1>
@stop

@section('content')

<div class="card">
    <div class="card-body">

        <p><strong>ID:</strong> {{ $item->id }}</p>
        <p><strong>Order ID:</strong> {{ $item->order_id }}</p>
        <p><strong>Product:</strong> {{ $item->product->name ?? '-' }}</p>
        <p><strong>Quantity:</strong> {{ $item->quantity }}</p>
        <p><strong>Price:</strong> ${{ $item->price }}</p>

        <hr>

        <a class="btn btn-secondary" href="{{ route('order-items.index') }}">Back</a>

    </div>
</div>

@stop
