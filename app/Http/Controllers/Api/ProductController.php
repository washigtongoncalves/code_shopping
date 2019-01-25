<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
