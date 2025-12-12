@extends('adminlte::page')

@section('title', 'Create Category')

@section('content_header')
    <h1>Add New Category</h1>
@stop

@section('content')
<div class="card p-3">
    <form action="{{ route('categories.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label>Category Name</label>
            <input type="text" name="name" class="form-control">
            @error('name')
                <span class="text-danger">{{ $message }}</span>
            @enderror
        </div>

        <button class="btn btn-success">Create</button>
    </form>
</div>
@stop