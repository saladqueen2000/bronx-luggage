@extends('adminlte::page')

@section('title', 'Create Color')

@section('content_header')
    <h1>Add New Color</h1>
@stop

@section('content')
<div class="card p-3">

    <form action="{{ route('colors.store') }}" method="POST">
        @csrf

        <div class="mb-3">
            <label>Color Name</label>
            <input type="text" class="form-control"name="name">
        </div>

        <div class="mb-3">
            <label>Hex Code</label>
            <input type="text" name="hex" class="form-control" placeholder="#FF0000">
        </div>

        <button class="btn btn-primary">Create</button>
    </form>
</div>
@stop
