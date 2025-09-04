<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\ProductRepository;
use App\Repositories\CartRepository;
use Illuminate\Support\Facades\Session;
use App\Models\Cart;
use Inertia\Response;

class ProductController extends Controller
{   
    public function __construct(private ProductRepository $productRepo, private CartRepository $cartRepository){}

    public function show():Response
    {
        return Inertia::render('ProductsIndex', [
            'products' => $this->productRepo->getAll(),
            'cart' => $this->getCart()
        ]);
    }

    private function getCart():?Cart
    {   
       $sessionId = Session::getId();

       return  $this->cartRepository->getProducts($sessionId);
    }
}
