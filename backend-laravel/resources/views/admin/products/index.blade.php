@extends('adminlte::page')

@section('title', 'Products')

@section('content_header')
    <h1>Product List</h1>
@stop

@section('content')

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<a class="btn btn-primary mb-3" href="{{ route('products.create') }}">Add Product</a>

<table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Gender</th>
            <th>Image</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        @foreach($products as $p)
        <tr>
            <td>{{ $p->id }}</td>
            <td>{{ $p->name }}</td>
            <td>{{ $p->category->name ?? '-' }}</td>
            <td>{{ $p->brand->name ?? '-' }}</td>
            <td>${{ $p->price }}</td>
            <td>{{ ucfirst($p->gender) }}</td>
            <td>
                @if($p->gallery->first())
                    <img src="{{ $p->gallery->first()->image_url }}" width="60" style="border-radius: 4px;">
                @else
                    <span class="text-muted">No image</span>
                @endif
            </td>
            <td>
                <a href="{{ route('products.edit', $p->id) }}" class="btn btn-warning btn-sm">Edit</a>

                <form action="{{ route('products.destroy', $p->id) }}" method="POST" style="display:inline-block;">
                    @csrf
                    @method('DELETE')
                    <button class="btn btn-danger btn-sm" onclick="return confirm('Delete this product?')">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

@stop
