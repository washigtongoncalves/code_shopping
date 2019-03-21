<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Requests\ProductRequest;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Traits\OnlyTrashedIfRequestedTrait;

class ProductController extends Controller
{
    use OnlyTrashedIfRequestedTrait;
    
    public function index()
    {
        $query = Product::query();
        $query = $this->onlyTrashedIfRequested($query);
        $products = $query->paginate(20);
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
