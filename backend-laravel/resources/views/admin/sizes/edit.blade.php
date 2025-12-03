@extends('adminlte::page')

@section('title', 'Edit Size')

@section('content_header')
    <h1>Edit Size</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">
        <form>
            <div class="form-group">
                <label>Size Name</label>
                <input type="text" class="form-control" value="Sample Size">
            </div>

            <button class="btn btn-success mt-3">Update</button>
        </form>
    </div>
</div>
@stop
