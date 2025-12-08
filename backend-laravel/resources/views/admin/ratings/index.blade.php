@extends('adminlte::page')

@section('title', 'Ratings')

@section('content_header')
    <h1>Ratings List</h1>
@stop

@section('content')

@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Stars</th>
            <th>Rating</th>
            <th>Comment</th>
            <th width="150px">Action</th>
        </tr>
    </thead>
    <tbody>
        @foreach($ratings as $r)
        <tr>
            <td>{{ $r->id }}</td>
            <td>{{ $r->user->name ?? 'Unknown' }}</td>
            <td>{{ $r->product->name ?? 'Unknown' }}</td>
            <td>{{ $r->stars }}</td>
            <td>{{ Str::limit($r->comment, 40) }}</td>
            <td>
                <a href="{{ route('ratings.show', $r->id) }}" class="btn btn-info btn-sm">View</a>

                <form action="{{ route('ratings.destroy', $r->id) }}" method="POST" style="display:inline-block;">
                    @csrf
                    @method('DELETE')
                    <button class="btn btn-danger btn-sm" onclick="return confirm('Delete this rating?')">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

@stop
