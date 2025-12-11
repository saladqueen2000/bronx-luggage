@extends('adminlte::page')

@section('title', 'Edit Size')

@section('content_header')
    <h1>Edit Size</h1>
@stop

@section('content')
<form action="/admin/sizes/{{ $size->id }}" method="POST">
    @csrf
    @method('PUT')

    <div class="mb-3">
        <label>Size Label</label>
        <input type="text" name="label" class="form-control" value="{{ $size->label }}" required>
    </div>

    <button class="btn btn-primary">Update</button>
</form>
@stop
