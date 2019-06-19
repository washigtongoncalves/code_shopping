<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Models\ProductInput;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Http\Filters\ProductInputFilter;

class InputController extends Controller
{
    public function index() 
    {
        $filter = app(ProductInputFilter::class);
        $filterQuery = ProductInput::with('product')->filtered($filter);
        $inputs = $filterQuery->paginate(10);
        return ProductInputResource::collection($inputs);
    }
}
