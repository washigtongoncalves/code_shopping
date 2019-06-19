<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Http\Resources\ProductOutputCollection;

class ProductOutputController extends Controller
{
    public function index(Product $product)
    {
        return new ProductOutputCollection($product->outputs, $product);
    }
}
