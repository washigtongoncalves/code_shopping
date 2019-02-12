<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;
use CodeShopping\Http\Resources\ProductPhotoCollection;
use CodeShopping\Http\Resources\ProductPhotoResource;
use Illuminate\Http\Request;

class ProductPhotoController extends Controller
{
    public function index(Product $product)
    {
        return new ProductPhotoCollection($product->photos, $product);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Product $product, ProductPhoto $photo)
    {
        if ($product->id !== $photo->product_id) {
            abort(404);
        }
        return new ProductPhotoResource($photo);
    }

    public function update(Request $request, ProductPhoto $photo)
    {
        //
    }

    public function destroy(ProductPhoto $photo)
    {
        //
    }
}
