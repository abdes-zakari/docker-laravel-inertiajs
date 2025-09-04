<?php

namespace App\Repositories;

use App\Models\Cart;
use Illuminate\Database\Eloquent\Collection;

class CartRepository
{   
    public function __construct(private Cart $cart){}

    public function getAll(): Collection
    {
        return $this->cart->all();
    }

    public function addOrUpdateCart(Cart $cart, int $product_id, int $quantity): void
    {
        $cart->items()->updateOrCreate(
            ['product_id' => $product_id ],
            [
                // 'qty' => \DB::raw('GREATEST(1, qty + '.(int)$quantity.')'),
                'qty' => (int)$quantity,
            ]
        );
    }

    public function getProducts(string $sessionId): ?Cart
    {      
        return Cart::with('items.product') 
                ->where('session_id', $sessionId)
                ->first();
    }



    public function removeProduct(Cart $cart, int $itemId): void
    {
        $cart->items()->where('id', $itemId)->delete();
    }
}
