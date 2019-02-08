<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Category;
use CodeShopping\Models\Product;
use CodeShopping\Http\Resources\CategoryProductResource;
use CodeShopping\Http\Requests\CategoryProductRequest;

class CategoryProductController extends Controller
{
    public function index(Category $category)
    {
        return new CategoryProductResource($category);
    }

    public function store(CategoryProductRequest $request, Category $category)
    {
        $changed = $category->products()->sync($request->get('products'));
        $productsAttachedId = $changed['attached'];
        $products = Product::whereIn('id', $productsAttachedId)->get();
        return $products->count() ? response()->json(new CategoryProductResource($category), 201) : [];
    }

    public function destroy(Category $category, Product $product)
    {
        $category->products()->detach($product->id);
        return response()->json([], 204);
    }
}
