@extends('adminlte::page')

@section('title', 'Add Brand')

@section('content_header')
    <h1>Add Brand</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">
        <form>
            <div class="form-group">
                <label>Brand Name</label>
                <input type="text" class="form-control" placeholder="Enter brand name">
            </div>

            <button class="btn btn-primary mt-3">Save</button>
        </form>
    </div>
</div>
@stop
