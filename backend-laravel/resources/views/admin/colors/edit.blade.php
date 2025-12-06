@extends('adminlte::page')

@section('title', 'Edit Color')

@section('content_header')
    <h1>Edit Color</h1>
@stop

@section('content')
<div class="card p-3">

    <form action="{{ route('colors.update', $color->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label>Color Name</label>
            <input type="text" name="name" class="form-control" value="{{ $color->name }}">
        </div>

        <div class="mb-3">
            <label>Hex Code (optional)</label>
            <input type="text" name="hex" class="form-control" value="{{ $color->hex }}" placeholder="#FF0000">
        </div>

        <button class="btn btn-success mt-3">Update</button>
    </form>
</div>
@stop
