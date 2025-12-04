@extends('adminlte::page')

@section('title', 'Colors')

@section('content_header')
    <h1>Color List</h1>
@stop

@section('content')
<div class="card">
    <div class="card-header">
        <a class="btn btn-primary" href="{{ route('colors.create') }}">Add Color</a>
    </div>

    <div class="card-body">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Color Name</th>
                    <th width="120px">Action</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td colspan="3" class="text-center">No data yet</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
@stop
