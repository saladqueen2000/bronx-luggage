@extends('adminlte::page')

@section('title', 'Brands')

@section('content_header')
    <h1>Brand List</h1>
@stop

@section('content')

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<div class="card">
    <div class="card-header">
        <a class="btn btn-primary" href="/admin/brands/create">Add Brand</a>
    </div>

    <div class="card-body">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Brand Name</th>
                    <th width="180px">Action</th>
                </tr>
            </thead>

            <tbody>
                @forelse($brands as $brand)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $brand->name }}</td>
                    <td>
                        <a class="btn btn-sm btn-warning" href="/admin/brands/{{ $brand->id }}/edit">Edit</a>

                        <form action="/admin/brands/{{ $brand->id }}" method="POST" style="display:inline-block">
                            @csrf
                            @method('DELETE')
                            <button onclick="return confirm('Delete this brand?')" class="btn btn-sm btn-danger">
                                Delete
                            </button>
                        </form>
                    </td>
                </tr>
                @empty
                <tr><td colspan="3" class="text-center">No data</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

@stop
