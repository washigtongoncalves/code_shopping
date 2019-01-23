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

    public function update(CategoryRequest $request, Category $category)
    {
        $category->fill($request->all());
        $category->save();
        return $category;
    }

    public function destroy(Category $category)
    {
        //
    }
}
