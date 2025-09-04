<?php
namespace App\Services;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderService
{

    public function placeOrder(Cart $cart): Order
    {
        if ($cart->items()->count() === 0) {
            throw ValidationException::withMessages([
                'cart' => 'Der Warenkorb ist leer.',
            ]);
        }

        return DB::transaction(function () use ($cart) {
            $cart = Cart::with(['items.product'])->lockForUpdate()->findOrFail($cart->id);

            $items = $cart->items;
            $total = 0.0;

            foreach ($items as $it) {
                $unit = (float) ($it->product->price ?? 0);
                $line = $unit * (int) $it->qty;
                $total += $line;
            }

            $order = Order::create([
                'user_id'  => $cart->user_id,
                'cart_id'  => $cart->id,
                'total'    => $total,
            ]);

            foreach ($items as $it) {
                $product = $it->product; 
                OrderItem::create([
                    'order_id' => $order->id,
                    'name'     => $product->name,
                    'qty'      => (int) $it->qty,
                    'price'    => (float) $product->price,
                ]);
            }

            return $order->load('items');
        });
    }
}
