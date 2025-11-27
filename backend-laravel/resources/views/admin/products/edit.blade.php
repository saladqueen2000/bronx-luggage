@extends('adminlte::page')

@section('title', 'Edit Product')

@section('content_header')
    <h1>Edit Product</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">
        <form>
            <div class="form-group">
                <label>Product Name</label>
                <input class="form-control">
            </div>

            <div class="form-group">
                <label>Price</label>
                <input class="form-control">
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea class="form-control"></textarea>
            </div>

            <button class="btn btn-success">Update</button>
        </form>
    </div>
</div>
@stop
