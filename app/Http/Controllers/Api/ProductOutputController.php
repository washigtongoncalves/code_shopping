<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductOutputRequest;
use CodeShopping\Models\Product;
use CodeShopping\Http\Resources\ProductOutputCollection;

class ProductOutputController extends Controller
{
    public function index(Product $product)
    {
        return new ProductOutputCollection($product->outputs, $product);
    }

    public function store(ProductOutputRequest $request, Product $product) 
    {
        $product->outputs()->create($request->all());
        return response()->json(new ProductOutputCollection($product->outputs, $product), 201);
    }
}
