@extends('adminlte::page')

@section('title', 'Orders')

@section('content_header')
    <h1>Orders</h1>
@stop

@section('content')
<table class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th><th>User</th><th>Total</th><th>Status</th><th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr><td colspan="5" class="text-center">No orders yet</td></tr>
    </tbody>
</table>
@stop
