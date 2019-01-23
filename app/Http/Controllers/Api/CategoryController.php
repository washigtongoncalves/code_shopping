<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Models\Category;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\CategoryRequest;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
       return Category::all();
    }

    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all() + ['slug' => 'teste']);
        $category->refresh();
        return $category;
    }

    public function show(Category $category)
    {
        return $category;
    }

    public function update(Request $request, Category $category)
    {
        //
    }

    public function destroy(Category $category)
    {
        //
    }
}
