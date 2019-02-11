<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductOutputRequest;
use CodeShopping\Http\Resources\ProductOutputResource;
use CodeShopping\Models\ProductOutput;

class ProductOutputController extends Controller
{
    public function index()
    {
        $outputs = ProductOutput::with('product')->paginate();
        return ProductOutputResource::collection($outputs);
    }
    
    public function store(ProductOutputRequest $request)
    {
        // Registra a nova saída do produto
        $productOuput = ProductOutput::create($request->all());
        return new ProductOutputResource($productOuput);
    }
    
    public function show(ProductOutput $output)
    {
        return new ProductOutputResource($output);
    }
}
