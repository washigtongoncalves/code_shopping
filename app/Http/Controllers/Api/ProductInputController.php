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
        
        // Atualiza o stock do produto
        $product = $productInput->product;
        $product->stock += $request->get('amount');
        $product->save();
        $productInput->refresh();
        
        return new ProductInputResource($productInput);
    }
    
    public function show()
    {
        
    }
}
