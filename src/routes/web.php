<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

// Route::get('/', function () {
//     return view('app');
// });

 Route::get('/', [ProductController::class, 'show']);


 Route::post('/cart/add', [CartController::class, 'addToCart']);

 Route::get('/cart/get', [CartController::class, 'getCartProducts']);


