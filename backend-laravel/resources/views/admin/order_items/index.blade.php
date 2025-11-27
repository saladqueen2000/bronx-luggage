@extends('adminlte::page')

@section('title', 'Order Items')

@section('content_header')
    <h1>Order Items</h1>
@stop

@section('content')
<div class="card">
    <div class="card-body">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td colspan="5" class="text-center">No data yet</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
@stop
