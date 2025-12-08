@extends('adminlte::page')

@section('title', 'Add Product')

@section('content_header')
    <h1>Add Product</h1>
@stop

@section('content')

<form action="{{ route('products.store') }}" method="POST">
    @csrf

    <div class="mb-3">
        <label>Product Name</label>
        <input type="text" name="name" class="form-control"required>
    </div>

    <div class="mb-3">
        <label>Category</label>
        <select name="category_id" class="form-control" required>
            <option value="">Select category</option>
            @foreach($categories as $c)
                <option value="{{ $c->id }}">{{ $c->name }}</option>
            @endforeach
        </select>
    </div>

    <div class="mb-3">
        <label>Brand</label>
        <select name="brand_id" class="form-control" required>
            <option value="">Select brand</option>
            @foreach($brands as $b)
                <option value="{{ $b->id }}">{{ $b->name }}</option>
            @endforeach
        </select>
    </div>

    <div class="mb-3">
        <label>Price</label>
        <input type="number" name="price" class="form-control" min="0" required>
    </div>
    <div class="mb-3">
        <label>Gender</label>
        <select name="gender" class="form-control" required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
        </select>
    </div>

    <div class="mb-3">
        <label>Colors</label>
        <select name="colors[]" class="form-control" multiple>
            @foreach($colors as $color)
                <option value="{{ $color->id }}">{{ $color->name }}</option>
            @endforeach
        </select>
    </div>

    <div class="mb-3">
        <label>Sizes</label>
        <select name="sizes[]" class="form-control" multiple>
            @foreach($sizes as $size)
                <option value="{{ $size->id }}">{{ $size->label }}</option>
            @endforeach
        </select>
    </div>

    <div class="mb-3">
        <label>Description</label>
        <textarea name="description" class="form-control"></textarea>
    </div>

    <button class="btn btn-primary">Save</button>

</form>

@stop
