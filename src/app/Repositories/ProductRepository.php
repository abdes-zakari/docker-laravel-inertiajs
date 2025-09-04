<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository
{   
    public function __construct(private Product $product){}

    public function getAll(): Collection
    {
        return $this->product->all();
    }
}
