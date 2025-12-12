@extends('adminlte::page')

@section('title', 'Orders')

@section('content_header')
    <h1>Orders</h1>
@stop

@section('content')

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        @foreach($orders as $o)
        <tr>
            <td>{{ $o->id }}</td>
            <td>{{ $o->user->name ?? 'Unknown' }}</td>
            <td>${{ $o->total_price }}</td>
            <td>{{ ucfirst($o->status) }}</td>
            <td>{{ $o->created_at }}</td>

            <td>
                <a href="{{ route('orders.show',$o->id) }}" class="btn btn-info btn-sm">View</a>
                <a href="{{ route('orders.edit',$o->id) }}" class="btn btn-warning btn-sm">Edit</a>

                <form action="{{ route('orders.destroy',$o->id) }}" method="POST" style="display:inline-block;">
                    @csrf @method('DELETE')
                    <button class="btn btn-danger btn-sm" onclick="return confirm('Delete order?')">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@stop
