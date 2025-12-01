@extends('adminlte::page')

@section('title', 'Ratings')

@section('content_header')
    <h1>Ratings & Feedback</h1>
@stop

@section('content')
<table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th><th>User</th><th>Rating</th><th>Comment</th>
        </tr>
    </thead>
    <tbody>
        <tr><td colspan="4" class="text-center">No reviews yet</td></tr>
    </tbody>
</table>
@stop
