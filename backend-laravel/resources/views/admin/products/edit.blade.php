@extends('adminlte::page')

@section('title', 'Edit Product')

@section('content_header')
<h1>Edit Product</h1>
@stop

@section('content')
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
    </div>
</div>
@stop