@extends('adminlte::page')

@section('title', 'Contact')

@section('content_header')
    <h1>Contact Messages</h1>
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
        @forelse($contacts as $c)
        <tr>
            <td>{{ $c->id }}</td>
            <td>{{ $c->name }}</td>
            <td>{{ $c->email }}</td>
            <td>{{ Str::limit($c->message, 50) }}</td>
        </tr>
        @empty
        <tr>
            <td colspan="4" class="text-center">No contact messages</td>
        </tr>
        @endforelse
    </tbody>
</table>

@stop
