@extends('adminlte::page')

@section('title', 'User Detail')

@section('content_header')
    <h1>User Detail</h1>
@stop

@section('content')

<div class="card">
    <div class="card-body">

        <p><strong>Name:</strong> {{ $user->name }}</p>
        <p><strong>Email:</strong> {{ $user->email }}</p>
        <p><strong>Joined:</strong> {{ $user->created_at }}</p>

        <hr>

        <h4>User Ratings</h4>
        <ul>
            @forelse($user->ratings as $r)
                <li>{{ $r->stars }}★ - {{ $r->comment }}</li>
            @empty
                <li>No ratings</li>
            @endforelse
        </ul>

        <hr>

        <h4>User Orders</h4>
        <ul>
            @forelse($user->orders as $o)
                <li>Order #{{ $o->id }} - {{ $o->created_at }}</li>
            @empty
                <li>No orders</li>
            @endforelse
        </ul>

        <a href="{{ route('users.index') }}" class="btn btn-secondary mt-3">Back</a>

    </div>
</div>

@stop
