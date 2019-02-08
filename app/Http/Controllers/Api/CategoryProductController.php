<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Category;
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

    public function destroy($id)
    {
        //
    }
}
