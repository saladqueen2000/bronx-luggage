@extends('adminlte::page')

@section('title', 'Categories')

@section('content_header')
    <h1>Category List</h1>
@stop

@section('content')
<div class="card">
    <div class="card-header">
        <a class="btn btn-primary" href="/admin/categories/create">Add Category</a>
    </div>

    <div class="card-body">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td colspan="2" class="text-center">No data yet</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
@stop
