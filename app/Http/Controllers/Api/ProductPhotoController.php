<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;
use CodeShopping\Http\Resources\ProductPhotoCollection;
use CodeShopping\Http\Resources\ProductPhotoResource;
use CodeShopping\Http\Requests\ProductPhotoRequest;

class ProductPhotoController extends Controller
{
    public function index(Product $product)
    {
        return new ProductPhotoCollection($product->photos, $product);
    }

    public function store(ProductPhotoRequest $request, Product $product)
    {
        $photos = ProductPhoto::createWithPhotosFiles($product->id, $request->photos);
        return response()->json(new ProductPhotoCollection($photos, $product), 201);
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

    public function destroy(Product $product, ProductPhoto $photo)
    {
        if ($product->id !== $photo->product_id) {
            abort(404);
        }
        $photo->deleteWithPhotoFile();
        return response([], 204);
    }
}
