<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Models\Product;
use CodeShopping\Http\Resources\ProductInputCollection;

class ProductInputController extends Controller
{
    public function index(Product $product)
    {
        return new ProductInputCollection($product->inputs, $product);
    }

    public function store(ProductInputRequest $request, Product $product) 
    {
        $product->inputs()->create($request->all());
        return response()->json(new ProductInputCollection($product->inputs, $product), 201);
    }
}
