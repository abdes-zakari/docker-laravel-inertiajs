<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function show(Order $order): Response
    {   
        return Inertia::render('Order', [
            'order' => $order->load('items'),
        ]);
    }
}
