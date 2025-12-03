@extends('adminlte::page')

@section('title', 'Edit Color')

@section('content_header')
    <h1>Edit Color</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">
        <form>
            <div class="form-group">
                <label>Color Name</label>
                <input type="text" class="form-control" value="Sample Color">
            </div>

            <button class="btn btn-success mt-3">Update</button>
        </form>
    </div>
</div>
@stop
