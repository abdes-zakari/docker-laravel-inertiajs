<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CartService;
use App\Models\Cart;
use App\Repositories\CartRepository;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use App\Services\OrderService;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class CartController extends Controller
{
    public function __construct(
        private CartRepository $cartRepository,
        private CartService $cartService,
        private OrderService $orderService
    ){}

    
    public function addToCart(Request $request): RedirectResponse
    {   
        $validated = $request->validate([
            'product_id' => ['required','integer','min:1','exists:products,id'],
            'quantity'   => ['required','integer','min:1','max:1000'],
        ]);

        $cart = $this->cartService->currentCart();

        $this->cartRepository->addOrUpdateCart($cart, $validated['product_id'], $validated['quantity']);

        return back()->with([
                'status'  => true,
                'message' => 'Product added successfully!'
        ]);
    }

    public function getCartProducts(Request $request)
    {   
        // dd( $this->cartRepository());
       $sessionId = Session::getId();
       dd( $cart = $this->cartService->currentCart()->toArray());
       $res =  $this->cartRepository->getProducts($sessionId);
       dd( $sessionId,$res);
    }

    public function updateCartItems(Request $request): void
    {   
        $validated = $request->validate([
            'product_id' => ['required','integer','min:1','exists:products,id'],
            'quantity'   => ['required','integer','min:1','max:1000'],
        ]);
        $cart = $this->cartService->currentCart();
        $this->cartRepository->addOrUpdateCart($cart, $validated['product_id'], $validated['quantity']);
    }

    public function removeProductFromCart(int $itemId): void
    {
        $cart = $this->cartService->currentCart();
        $this->cartRepository->removeProduct($cart, $itemId);
    }


    public function checkout():Response
    {
        $cart = $this->cartService->currentCart();

        return Inertia::render('Checkout', [
            'cart' => $cart->load('items.product'),
        ]);
    }

    public function checkoutProcess(): RedirectResponse
    {   
        $cart  = $this->cartService->currentCart();
        $order = $this->orderService->placeOrder($cart);
        $cart->items()->delete();

        return redirect()->route('orders.show', $order);
    }
}
