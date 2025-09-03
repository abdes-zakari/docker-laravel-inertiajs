<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{   
    public function __construct(private Product $product){}

    public function getAll()
    {
        return $this->product->all();
    }
}
