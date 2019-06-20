<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Models\ProductOutput;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Resources\OutputResource;
use CodeShopping\Http\Filters\ProductOutputFilter;

class OutputController extends Controller
{
    public function index()
    {
        $filter = app(ProductOutputFilter::class);
        $filterQuery = ProductOutput::with('product')->filtered($filter);
        $outputs = $filterQuery->paginate(10);
        return OutputResource::collection($outputs);
    }
}
