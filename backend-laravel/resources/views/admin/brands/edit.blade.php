@extends('adminlte::page')

@section('title', 'Edit Brand')

@section('content_header')
    <h1>Edit Brand</h1>
@stop

@section('content')

<form action="/admin/brands/{{ $brand->id }}" method="POST">
    @csrf
    @method('PUT')
    <div class="mb-3">
        <label>Brand Name</label>
        <input type="text" name="name" class="form-control" value="{{ $brand->name }}">
        @error('name') <span class="text-danger">{{ $message }}</span>@enderror
    </div>

    <button class="btn btn-success">Update</button>
</form>

@stop
