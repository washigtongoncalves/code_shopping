<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Requests\ProductRequest;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Http\Resources\ProductResource;

class ProductController extends Controller
{
    public function index()
    {
        return ProductResource::collection(Product::paginate(10));
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
}
