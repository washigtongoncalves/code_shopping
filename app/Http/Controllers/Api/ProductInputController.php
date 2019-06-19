<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Http\Resources\ProductInputCollection;

class ProductInputController extends Controller
{
    public function index(Product $product)
    {
        return new ProductInputCollection($product->inputs, $product);
    }
}
