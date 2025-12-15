@extends('adminlte::page')

@section('title', 'Feedback')

@section('content_header')
    <h1>Feedback List</h1>
@stop

@section('content')

<table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
        </tr>
    </thead>
    <tbody>
        @forelse($feedbacks as $f)
        <tr>
            <td>{{ $f->id }}</td>
            <td>{{ $f->name }}</td>
            <td>{{ $f->email }}</td>
            <td>{{ Str::limit($f->message, 50) }}</td>
        </tr>
        @empty
        <tr>
            <td colspan="4" class="text-center">No feedback found</td>
        </tr>
        @endforelse
    </tbody>
</table>

@stop
