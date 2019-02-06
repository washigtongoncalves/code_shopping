<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Models\Category;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    public function index(Product $product)
    {
        return $product->categories;
    }

    public function store(Request $request, Product $product)
    {
        $changed = $product->categories()->sync($request->get('categories'));
        $categoriesAttachedId = $changed['attached'];
        $categories = Category::whereIn('id', $categoriesAttachedId)->get();
        return $categories->count() ? response()->json($categories, 201) : $categories;
    }

    public function destroy($id)
    {
        //
    }
}
