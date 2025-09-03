<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CartService;
use App\Models\Cart;
use App\Repositories\CartRepository;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function __construct(private CartRepository $cartRepository, private CartService $cartService){}

    
    public function addToCart(Request $request)
    {   
         $validated = $request->validate([
            'product_id' => ['required','integer','min:1','exists:products,id'],
            'quantity'   => ['required','integer','min:1','max:1000'],
        ]);

        $cart = $this->cartService->currentCart();


        $this->cartRepository->addToCart($cart, $validated['product_id'], $validated['quantity']);
        // dd(User::where('name','Test User')->first()->id);
        // $cart = $this->cartService->currentCart();

        //   $cart->items()->updateOrCreate(
        //     ['product_id' => $validated['product_id']],
        //     [
        //     'qty' => \DB::raw('GREATEST(1, qty + '.(int)$validated['quantity'].')'),
        //     // 'unit_price_cents' => Product::find($validated['product_id'])->price_cents,
        //     ]
        // );

        // $cart->items()->create([...]);
        // dd($cart->id, $request);

         return back()->with([
                'status'  => true,
                'message' => 'Product added successfully!'
            ]);

    }

    public function getCartProducts(Request $request)
    {   
        // dd( $this->cartRepository());
       $sessionId = Session::getId();
       $res =  $this->cartRepository->getProducts($sessionId);
       dd( $res);
    }
}
