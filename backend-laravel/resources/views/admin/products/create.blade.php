@extends('adminlte::page')

@section('title', 'Create Product')

@section('content_header')
<h1>Create Product</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">
        <form action="/admin/products" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="form-group">
                <label>Name</label>
                <input name="name" class="form-control" required>
            </div>

            <div class="form-group">
                <label>Price</label>
                <input name="price" type="number" class="form-control" required>
            </div>

            <div class="form-group">
                <label>Brand</label>
                <select name="brand_id" class="form-control" required>
                    @foreach($brands as $b)
                        <option value="{{ $b->id }}">{{ $b->name }}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label>Category</label>
                <select name="category_id" class="form-control" required>
                    @foreach($categories as $c)
                        <option value="{{ $c->id }}">{{ $c->name }}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label>Colors</label>
                <select name="colors[]" class="form-control" multiple>
                    @foreach($colors as $c)
                        <option value="{{ $c->id }}">{{ $c->name }}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label>Sizes</label>
                <select name="sizes[]" class="form-control" multiple>
                    @foreach($sizes as $s)
                        <option value="{{ $s->id }}">{{ $s->label }}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label>Gallery Images</label>
                <input type="file" name="gallery[]" class="form-control" multiple>
                <small class="form-text text-muted">Select multiple images</small>
            </div>

            <button type="submit" class="btn btn-success">Create Product</button>
            <a href="/admin/products" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>
@stop