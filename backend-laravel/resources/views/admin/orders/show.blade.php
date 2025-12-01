@extends('adminlte::page')

@section('title', 'Order Detail')

@section('content_header')
    <h1>Order Detail</h1>
@stop

@section('content')
<div class="card">
    <div class="body-card">
        
        {{--Order Infomation--}}
        <h4>Order Information</h4>
        <table class="table table-bordered w-50">
            <tr>
                <th>Order ID</th>
                <td>#0000</td>
            </tr>
            <tr>
                <th>User</th>
                <td>John Cena</td>
            </tr>
            <tr>
                <th>Status</th>
                <td><span class="bagde bg-success">Completed</span></td>
            </tr>
            <tr>
                <th>Total</th>
                <td>$150.00</td>
            </tr>
            <tr>
                <th>Date</th>
                <td>2025-01-01</td>
            </tr>
        </table>
        <hr>

        {{--Order Items--}}
        <h4>Order Items</h4>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Product</th>
                    <th witdh="120px">Quantity</th>
                    <th witdh="120px">Price</th>
                    <th witdh="120px">Subtotal</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Sample Product A</td>
                    <td>2</td>
                    <td>$50</td>
                    <td>$100</td>
                </tr>
                <tr>
                    <td>Sample Product B</td>
                    <td>1</td>
                    <td>$55</td>
                    <td>$50</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
@stop
