<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Category;
use CodeShopping\Models\Product;
use CodeShopping\Http\Resources\CategoryProductResource;

class CategoryProductController extends Controller
{
    public function index(Category $category)
    {
        return new CategoryProductResource($category);
    }

    public function store(Request $request)
    {
        //
    }

    public function destroy(Category $category, Product $product)
    {
        $category->products()->detach($product->id);
        return response()->json([], 204);
    }
}
