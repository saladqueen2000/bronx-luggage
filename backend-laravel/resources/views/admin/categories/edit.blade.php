@extends('adminlte::page')

@section('title', 'Edit Category')

@section('content_header')
    <h1>Edit Category</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">

        <form>
            <div class="form-group">
                <label>Category Name</label>
                <input type="text" class="form-control" value="Sample Category">
            </div>

            <button class="btn btn-success mt-3">Update</button>
        </form>

    </div>
</div>
@stop
