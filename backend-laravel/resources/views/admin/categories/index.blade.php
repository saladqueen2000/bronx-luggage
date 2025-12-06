@extends('adminlte::page')

@section('title', 'Categories')

@section('content_header')
    <h1>Category List</h1>
@stop

@section('content')
<div class="card">
    <div class="card-header">
        <a class="btn btn-primary" href="{{ route('categories.create') }}">Add Category</a>
    </div>

    <div class="card-body">
        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th width="50">ID</th>
                    <th>Name</th>
                    <th width="150">Actions</th>
                </tr>
            </thead>

            <tbody>
                @forelse ($categories as $cat)
                <tr>
                    <td >{{ $cat->id }}</td>
                    <td >{{ $cat->name }}</td>
                    <td>
                        <a href="{{ route('categories.edit', $cat->id) }}" class="btn btn-sm btn-warning">Edit</a>

                        <form action="{{ route('categories.destroy', $cat->id) }}" 
                                method="POST"
                                style="display:inline-block">
                            @csrf
                            @method('DELETE')
                            <button onclick="return confirm('Delete this category?')" 
                                    class="btn btn-sm btn-danger">
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
