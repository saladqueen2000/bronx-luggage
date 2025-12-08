@extends('adminlte::page')

@section('title', 'Brands')

@section('content_header')
    <h1>Brand List</h1>
@stop

@section('content')
<div class="card">
    <div class="card-header">
        <a class="btn btn-primary" href="/admin/brands/create">Add Brand</a>
    </div>

    <div class="card-body">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Brand Name</th>
                    <th width="150px">Action</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>Sample Brand</td>
                    <td>
                        <a href="/admin/brands/edit" class="btn btn-sm btn-warning">Edit</a>
                        <a href="#" class="btn btn-sm btn-danger">Delete</a>
                    </td>
                </tr>

                <tr>
                    <td colspan="3" class="text-center">No more data</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
@stop
