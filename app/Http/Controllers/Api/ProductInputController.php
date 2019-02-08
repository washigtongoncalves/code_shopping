<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Models\ProductInput;

class ProductInputController extends Controller
{
    public function store(ProductInputRequest $request)
    {
        $productInput = ProductInput::create($request->all());
        $productInput->refresh();
        return new ProductInputResource($productInput);
    }
}
