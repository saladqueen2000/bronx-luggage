@extends('adminlte::page')

@section('title', 'Add Size')

@section('content_header')
    <h1>Add Size</h1>
@stop

@section('content')
<form action="/admin/sizes" method="POST">
    @csrf

    <div class="mb-3">
        <label>Size Label</label>
        <input type="text" name="label" class="form-control" required>
    </div>

    <button class="btn btn-success">Save</button>
</form>
@stop
