@extends('adminlte::page')

@section('title', 'Products')

@section('content_header')
<h1>Product List</h1>
@stop

@section('content')
<div class="card">
    <div class="card-header">
        <a class="btn btn-primary" href="/admin/products/create">Add Product</a>
    </div>
    <div class="card-body">
        @if(session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th width="150px">Action</th>
                </tr>
            </thead>
            <tbody>
                @forelse($products as $p)
                    <tr>
                        <td>{{ $p->id }}</td>
                        <td>{{ $p->name }}</td>
                        <td>{{ $p->brand->name ?? 'N/A' }}</td>
                        <td>{{ $p->category->name ?? 'N/A' }}</td>
                        <td>{{ $p->price }}</td>
                        <td>
                            <a href="/admin/products/edit/{{ $p->id }}" class="btn btn-warning btn-sm">Edit</a>
                            <form action="/admin/products/{{ $p->id }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-danger btn-sm" onclick="return confirm('Delete?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="text-center">No data yet</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@stop