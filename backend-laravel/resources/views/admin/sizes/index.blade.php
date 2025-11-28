@extends('adminlte::page')

@section('title', 'Sizes')

@section('content_header')
    <h1>Size List</h1>
@stop

@section('content')
<div class="card">
    <div class="card-header">
        <a class="btn btn-primary" href="/admin/sizes/create">Add Size</a>
    </div>

    <div class="card-body">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Size Name</th>
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
