<?php
namespace App\Services;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CartService
{
    public function currentCart(): Cart {
        $sessionId = Session::getId();

        // if (Auth::check()) {
            $cart = Cart::firstOrCreate(
                ['user_id' => User::where('name','Test User')->first()->id],
                ['session_id' => $sessionId]
            );

            $sessionCart = Cart::where('session_id', $sessionId)
                // ->where('status', 'active')
                ->whereNull('user_id')
                ->first();

            if ($sessionCart && $sessionCart->id !== $cart->id) {
                foreach ($sessionCart->items as $item) {
                    $cart->items()->updateOrCreate(
                        ['product_id' => $item->product_id],
                        [
                            'qty' => \DB::raw('qty + '.$item->qty),
                            // 'unit_price_cents' => $item->unit_price_cents,
                        ]
                    );
                }
                // $sessionCart->update(['status' => 'abandoned']);
                // $cart->refreshTotals();
            }
            return $cart;
    //     }

    //     return Cart::firstOrCreate(
    //         ['session_id' => $sessionId /*, 'status' => 'active'*/],
    //         ['user_id' => null]
    //     );
    }
}
