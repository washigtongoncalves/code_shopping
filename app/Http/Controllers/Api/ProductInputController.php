<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Models\ProductInput;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Http\Filters\ProductInputFilter;

class ProductInputController extends Controller
{
    public function index(Request $request) 
    {
        $filter = app(ProductInputFilter::class);
        $filterQuery = ProductInput::with('product')->filtered($filter);
        $inputs = $request->has('all') ? $filterQuery->get() : $filterQuery->paginate(10);
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
