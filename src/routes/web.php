<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;


// Route::get('/', function () {
//     return view('app');
// });

Route::get('/', [ProductController::class, 'show']);


Route::post('/cart/add', [CartController::class, 'addToCart']);
// Route::get('/cart/get', [CartController::class, 'getCartProducts']);
Route::put('/cart/update', [CartController::class, 'updateCartItems']);
Route::delete('/cart/delete/{itemId}', [CartController::class, 'removeProductFromCart'])->name('cart.items.destroy');
Route::get('/checkout', [CartController::class, 'checkout']);
Route::post('/checkout', [CartController::class, 'checkoutProcess'])->name('checkout.store');
Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');