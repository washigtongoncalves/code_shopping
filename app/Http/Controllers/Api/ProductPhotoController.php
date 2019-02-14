<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;
use CodeShopping\Http\Resources\ProductPhotoCollection;
use CodeShopping\Http\Resources\ProductPhotoResource;
use CodeShopping\Http\Requests\ProductPhotoRequest;
use CodeShopping\Http\Requests\ProductPhotoUpdateRequest;

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

    /*
     *  Para edição da imagem não use o método PUT, pois o PHP não suporta envio 
     *  de arquivos com método PUT, use o POST, e adicione o parâmetro _method=PUT 
     *  como parâmetro da requisição.
     */
    public function update(ProductPhotoUpdateRequest $request, Product $product, ProductPhoto $photo)
    {
        if ($product->id !== $photo->product_id) {
            abort(404);
        }
        $photo->updatePhotoFile($request->photo);
        return new ProductPhotoResource($photo);
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
