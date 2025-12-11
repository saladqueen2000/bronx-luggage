@extends('adminlte::page')

@section('title', 'Add Brand')

@section('content_header')
    <h1>Add Brand</h1>
@stop

@section('content')

<form action="/admin/brands" method="POST">
    @csrf

    <div class="mb-3">
        <label>Brand Name</label>
        <input type="text" name="name" class="form-control">
        @error('name') <span class="text-danger">{{ $message }}</span> @enderror
    </div>

    <button class="btn btn-primary">Save</button>
</form>

@stop
