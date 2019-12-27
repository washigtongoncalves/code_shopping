<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Requests\ProductRequest;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Traits\OnlyTrashedIfRequestedTrait;
use CodeShopping\Http\Filters\ProductFilter;

class ProductController extends Controller
{
    use OnlyTrashedIfRequestedTrait;
    
    public function index(Request $request)
    {
        $filter = app(ProductFilter::class);
        $query  = Product::query(); 
        $query  = $this->onlyTrashedIfRequested($query);
        $filterQuery = $query->filtered($filter);
        $products = $filter->hasFilterParameter() || $request->has('all') ? $filterQuery->get() : $filterQuery->paginate(10);
        return ProductResource::collection($products);
    }

    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());
        $product->refresh();
        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->fill($request->all());
        $product->save();
        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response([], 204);
    }
    
    public function restore(Product $product) 
    {
        $product->restore();
        return response()->json([], 204);
    }
}
