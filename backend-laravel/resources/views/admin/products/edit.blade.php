@extends('adminlte::page')

@section('title', 'Edit Product')

@section('content_header')
    <h1>Edit Product</h1>
@stop

@section('content')

<form action="{{ route('products.update', $product->id) }}" method="POST">
    @csrf
    @method('PUT')

    <div class="mb-3">
        <label>Product Name</label>
        <input type="text" name="name" class="form-control" value="{{ $product->name }}" required>
    </div>

    <div class="mb-3">
        <label>Category</label>
        <select name="category_id" class="form-control" required>
            @foreach($categories as $c)
                <option value="{{ $c->id }}" {{ $product->category_id == $c->id ? 'selected' : '' }}>
                    {{ $c->name }}
                </option>
            @endforeach
        </select>
    </div>

    <div class="mb-3">
        <label>Brand</label>
        <select name="brand_id" class="form-control" required>
            @foreach($brands as $b)
                <option value="{{ $b->id }}" {{ $product->brand_id == $b->id ? 'selected' : '' }}>
                    {{ $b->name }}
                </option>
            @endforeach
        </select>
    </div>

    <div class="mb-3">
        <label>Gender</label>
        <select name="gender" class="form-control" required>
            <option value="male" {{ $product->gender == 'male' ? 'selected' : '' }}>Male</option>
            <option value="female" {{ $product->gender == 'female' ? 'selected' : '' }}>Female</option>
            <option value="unisex" {{ $product->gender == 'unisex' ? 'selected' : '' }}>Unisex</option>
        </select>
    </div>

    <div class="mb-3">
        <label>Price</label>
        <input type="number" name="price" class="form-control" value="{{ $product->price }}" required>
    </div>

    <div class="mb-3">
        <label>Colors</label>
        <select name="colors[]" class="form-control" multiple>
            @foreach($colors as $color)
                <option value="{{ $color->id }}"
                    {{ $product->colors->contains($color->id) ? 'selected' : '' }}>
                    {{ $color->name }}
                </option>
            @endforeach
        </select>
    </div>

    <div class="mb-3">
        <label>Sizes</label>
        <select name="sizes[]" class="form-control" multiple>
            @foreach($sizes as $size)
                <option value="{{ $size->id }}"
                    {{ $product->sizes->contains($size->id) ? 'selected' : '' }}>
                    {{ $size->label }}
                </option>
            @endforeach
        </select>
    </div>

    <div class="mb-3">
        <label>Description</label>
        <textarea name="description" class="form-control">{{ $product->description }}</textarea>
    </div>

    <button class="btn btn-primary">Update</button>
</form>
<hr>
<h3>Product Images</h3>

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<!-- Upload mới -->
<form action="{{ route('products.gallery.store', $product->id) }}" 
      method="POST" 
      enctype="multipart/form-data">

    @csrf

    <div class="mb-3">
        <label>Upload Images</label>
        <input type="file" name="images[]" class="form-control" multiple required>
    </div>

    <button class="btn btn-primary">Upload</button>
</form>

<!-- Danh sách ảnh -->
<div class="row mt-4">
    @foreach($product->gallery as $img)
        <div class="col-3 mb-3">
            <img src="{{ asset( $img->image_url ) }}" class="img-fluid" style="border: 1px solid #ddd" width="120">

            <form action="{{ route('products.gallery.delete', $img->id) }}" method="POST" class="mt-2 text-center">

                @csrf
                @method('DELETE')

                <button class="btn btn-danger btn-sm">Delete</button>
            </form>
        </div>
    @endforeach
</div>

@stop
