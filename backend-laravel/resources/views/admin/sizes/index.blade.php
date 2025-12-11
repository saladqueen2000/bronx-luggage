@extends('adminlte::page')

@section('title', 'Sizes')

@section('content_header')
    <h1>Size List</h1>
@stop

@section('content')
<a href="/admin/sizes/create" class="btn btn-primary mb-3">Add Size</a>

<table class="table table-bordered">
    <thead>
        <tr>
            <th>#</th>
            <th>Size Label</th>
            <th width="120px">Action</th>
        </tr>
    </thead>

    <tbody>
        @forelse ($sizes as $size)
        <tr>
            <td>{{ $loop->iteration }}</td>
            <td>{{ $size->label }}</td>
            <td>
                <a href="/admin/sizes/{{ $size->id }}/edit" class="btn btn-warning btn-sm">Edit</a>

                <form action="/admin/sizes/{{ $size->id }}" method="POST" style="display:inline-block;">
                    @csrf
                    @method('DELETE')
                    <button class="btn btn-danger btn-sm" onclick="return confirm('Delete size?')">Delete</button>
                </form>
            </td>
        </tr>
        @empty
        <tr>
            <td colspan="3" class="text-center">No data yet</td>
        </tr>
        @endforelse
    </tbody>
</table>
@stop
