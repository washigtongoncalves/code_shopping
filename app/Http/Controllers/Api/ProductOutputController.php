<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Models\ProductOutput;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductOutputRequest;
use CodeShopping\Http\Resources\ProductOutputResource;
use CodeShopping\Http\Filters\ProductOutputFilter;

class ProductOutputController extends Controller
{
    public function index()
    {
        $filter = app(ProductOutputFilter::class);
        $filterQuery = ProductOutput::with('product')->filtered($filter);
        $outputs = $filterQuery->paginate(10);
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
