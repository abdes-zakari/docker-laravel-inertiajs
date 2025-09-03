<?php

namespace App\Repositories;

use App\Models\Cart;

class CartRepository
{   
    public function __construct(private Cart $cart){}

    public function getAll()
    {
        return $this->cart->all();
    }

    public function addToCart($cart, $product_id, $quantity)
    {
        // $cart = $this->cartService->currentCart();

        $cart->items()->updateOrCreate(
            ['product_id' => $product_id ],
            [
            'qty' => \DB::raw('GREATEST(1, qty + '.(int)$quantity.')'),
            // 'unit_price_cents' => Product::find($validated['product_id'])->price_cents,
            ]
        );
    }

    public function getProducts($sessionId)
    {      
        return $cart = Cart::with('items.product') // falls du auch Produktdaten brauchst
    ->where('session_id', $sessionId)
    ->first();

        // $sessionCart = Cart::where('session_id', $sessionId)->first()->items;

        // $items = $sessionCart->items;
        // dd($items->toArray());
    // foreach ($sessionCart->items as $item) {
    //     echo $item->product->name;
    //     echo"<br>";
    // }
        
    }
}
