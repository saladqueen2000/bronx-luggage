@extends('adminlte::page')

@section('title', 'Edit Brand')

@section('content_header')
    <h1>Edit Brand</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">
        <form>

            <div class="form-group">
                <label>Brand Name</label>
                <input type="text" class="form-control" value="Sample Brand">
            </div>

            <button class="btn btn-success mt-3">Update</button>
        </form>
    </div>
</div>
@stop
