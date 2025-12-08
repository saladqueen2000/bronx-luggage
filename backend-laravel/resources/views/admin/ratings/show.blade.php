@extends('adminlte::page')

@section('title', 'Ratings Details')

@section('content_header')
    <h1>Rating Details</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">

        <p><strong>User:</strong> {{ $rating->user->name ?? 'Unknown' }}</p>
        <p><strong>Product:</strong> {{ $rating->product->name ?? 'Unknown' }}</p>
        <p><strong>Stars:</strong> {{ $rating->stars }}</p>
        <p><strong>Comment:</strong> {{ $rating->comment }}</p>
        <p><strong>Date:</strong> {{ $rating->created_at }}</p>

        <a href="{{ route('ratings.index') }}" class="btn btn-secondary mt-3">Back</a>
    </div>
</div>
@stop