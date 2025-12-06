@extends('adminlte::page')

@section('title', 'Colors')

@section('content_header')
    <h1>Colors</h1>
@stop

@section('content')
<div class="card">
    <div class="card-header">
        <a class="btn btn-primary" href="{{ route('colors.create') }}">Add Color</a>
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
                    <th>Hex Code</th>
                    <th width="120px">Action</th>
                </tr>
            </thead>

            <tbody>
                @forelse ($colors as $color)
                <tr>
                    <td>{{ $color->id }}</td>
                    <td>{{ $color->name }}</td>
                    <td>
                        {{ $color->hex }}
                        @if($color->hex)
                            <span style="display:inline-block;width:20px;height:20px;border:1px solid #000;background:{{ $color->hex }}"></span>
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('colors.edit', $color->id) }}" class="btn btn-sm btn-warning">Edit</a>

                        <form action="{{ route('colors.destroy', $color->id) }}" method="POST" style="display:inline-block">
                            @csrf
                            @method('DELETE')
                            <button onclick="return confirm('Delete this color?')" class="btn btn-sm btn-danger">Delete</button>
                        </form>
                    </td>
                </tr>
                @empty
                    <tr><td colspan="4" class="text-center">No data</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@stop
