@extends('adminlte::page')

@section('title', 'Edit Product')

@section('content_header')
<h1>Edit Product</h1>
@stop

@section('content')
<<<<<<< HEAD
<div class="card">
    <div class="card-body">
        <form action="/admin/products/{{ $product->id }}" method="POST">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label>Name</label>
                <input name="name" class="form-control" value="{{ $product->name }}" required>
            </div>

            <div class="form-group">
                <label>Price</label>
                <input name="price" type="number" class="form-control" value="{{ $product->price }}" required>
            </div>

            <div class="form-group">
                <label>Brand</label>
                <select name="brand_id" class="form-control" required>
                    @foreach($brands as $b)
                        <option value="{{ $b->id }}" {{ $product->brand_id == $b->id ? 'selected' : '' }}>{{ $b->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label>Category</label>
                <select name="category_id" class="form-control" required>
                    @foreach($categories as $c)
                        <option value="{{ $c->id }}" {{ $product->category_id == $c->id ? 'selected' : '' }}>{{ $c->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label>Colors</label>
                <select name="colors[]" class="form-control" multiple>
                    @foreach($colors as $c)
                        <option value="{{ $c->id }}" {{ in_array($c->id, $product->colors->pluck('id')->toArray()) ? 'selected' : '' }}>{{ $c->name }}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label>Sizes</label>
                <select name="sizes[]" class="form-control" multiple>
                    @foreach($sizes as $s)
                        <option value="{{ $s->id }}" {{ in_array($s->id, $product->sizes->pluck('id')->toArray()) ? 'selected' : '' }}>{{ $s->label }}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label>Gallery URLs (comma separated)</label>
                <input name="gallery" class="form-control"
                    value="{{ $product->gallery->pluck('image_url')->implode(',') }}"
                    placeholder="https://example.com/img1.jpg,https://example.com/img2.jpg">
            </div>

            <button type="submit" class="btn btn-success">Update Product</button>
            <a href="/admin/products" class="btn btn-secondary">Cancel</a>
        </form>
=======

<form action="{{ route('products.update', $product->id) }}" method="POST">
    @csrf
    @method('PUT')

    <div class="mb-3">
        <label>Product Name</label>
        <input type="text" name="name" class="form-control" value="{{ $product->name }}" required>
>>>>>>> a61dc8f4b37a9aa1aab088e033c986af834abfed
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
<<<<<<< HEAD
@stop
=======

@stop
>>>>>>> a61dc8f4b37a9aa1aab088e033c986af834abfed
