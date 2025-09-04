<?php
namespace App\Services;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use App\Repositories\CartRepository;

class CartService
{   
    public function __construct(private CartRepository $cartRepository){}

    public function currentCart(): Cart
    {

        $sessionId = Session::getId();

        $user = User::where('name', 'Test User')->first();

        $cart = Cart::firstOrCreate([
            'user_id' => $user->id,
            'session_id' => $sessionId
        ]);

        // $sessionCart = Cart::where('session_id', $sessionId)
        //     ->whereNull('user_id')
        //     ->first();

        // if ($sessionCart && $sessionCart->id !== $cart->id) {
        //     foreach ($sessionCart->items as $item) {
        //         $cart->items()->updateOrCreate(
        //             ['product_id' => $item->product_id],
        //             [
        //                 'qty' => \DB::raw('qty + '.$item->qty),
        //             ]
        //         );
        //     }
        // }
        return $cart;
    }

    // public function forSharedProps()
    // {
    //     $sessionId = Session::getId();
    //     return $this->cartRepository->getProducts($sessionId);
    // }
}
