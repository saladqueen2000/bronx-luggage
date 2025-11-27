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
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th width="120px">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="6" class="text-center">No data yet</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
@stop
