@extends('adminlte::page')

@section('title', 'Add Color')

@section('content_header')
    <h1>Add Color</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">
        <form>
            <div class="form-group">
                <label>Color Name</label>
                <input type="text" class="form-control" placeholder="Enter color name">
            </div>

            <button class="btn btn-primary mt-3">Save</button>
        </form>
    </div>
</div>
@stop
