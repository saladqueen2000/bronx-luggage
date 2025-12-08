@extends('adminlte::page')

@section('title', 'Order Items')

@section('content_header')
    <h1>Order Items</h1>
@stop

@section('content')

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th width="150px">Action</th>
        </tr>
    </thead>

    <tbody>
        @foreach($items as $i)
        <tr>
            <td>{{ $i->id }}</td>
            <td>{{ $i->order_id }}</td>
            <td>{{ $i->product->name ?? '-' }}</td>
            <td>{{ $i->quantity }}</td>
            <td>${{ $i->price }}</td>

            <td>
                <a href="{{ route('order-items.show', $i->id) }}" class="btn btn-info btn-sm">View</a>

                <form action="{{ route('order-items.destroy', $i->id) }}" method="POST" style="display:inline-block;">
                    @csrf
                    @method('DELETE')
                    <button onclick="return confirm('Delete item?')" class="btn btn-danger btn-sm">
                        Delete
                    </button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

@stop
