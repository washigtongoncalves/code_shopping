<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Models\ProductInput;

class ProductInputController extends Controller
{
    public function index() 
    {
        $inputs = ProductInput::with('product')->paginate();
        return ProductInputResource::collection($inputs);
    }
    
    public function store(ProductInputRequest $request)
    {
        // Registra a nova entrada do produto
        $productInput = ProductInput::create($request->all());
        return new ProductInputResource($productInput);
    }
    
    public function show(ProductInput $input)
    {
        return new ProductInputResource($input);
    }
}
