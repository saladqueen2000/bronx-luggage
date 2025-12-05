@extends('adminlte::page')

@section('title', 'Add Brand')

@section('content_header')
    <h1>Add Brand</h1>
@stop

@section('content')
<form action="/admin/brands" menthod="post">
    @csrf
    <div class="mb-3">
        <label>Brand Name</label>
        <input type="text" class="form-control">
        @error('record')
            <span class="text-danger">{{ $message }}</span>
        @enderror
        <button class="btn btn-primary">Save</button>
    </div>
</form>
@stop
