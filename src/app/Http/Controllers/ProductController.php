<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\ProductRepository;
use App\Repositories\CartRepository;
use Illuminate\Support\Facades\Session;

class ProductController extends Controller
{   
    public function __construct(private ProductRepository $productRepo, private CartRepository $cartRepository){}

    public function show()
    {
        return Inertia::render('ProductsIndex', [
            'products' => $this->productRepo->getAll(),
            'cart' => $this->getCart()
        ]);
    }

    private function getCart()
    {   
       $sessionId = Session::getId();
       return  $this->cartRepository->getProducts($sessionId);
    }
}
