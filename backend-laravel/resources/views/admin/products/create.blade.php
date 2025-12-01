@extends('adminlte::page')

@section('title', 'Add Product')

@section('content_header')
    <h1>Add Product</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">
        <form>

            <div class="form-group">
                <label>Product Name</label>
                <input class="form-control" placeholder="Enter product name">
            </div>

            <div class="form-group">
                <label>Price</label>
                <input class="form-control" placeholder="Enter price">
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea class="form-control"></textarea>
            </div>

            <button class="btn btn-primary">Save</button>

        </form>
    </div>
</div>
@stop
