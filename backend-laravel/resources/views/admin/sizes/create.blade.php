@extends('adminlte::page')

@section('title', 'Add Size')

@section('content_header')
    <h1>Add Size</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">
        <form>
            <div class="form-group">
                <label>Size Name</label>
                <input type="text" class="form-control" placeholder="Enter size name">
            </div>

            <button class="btn btn-primary mt-3">Save</button>
        </form>
    </div>
</div>
@stop
