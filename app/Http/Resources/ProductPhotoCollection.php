<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use CodeShopping\Models\Product;

class ProductPhotoCollection extends ResourceCollection
{
    private $product;
            
    public function __construct($resouce, Product $product) 
    {
        $this->product = $product;
        parent::__construct($resouce);
    }
    
    public function toArray($request)
    {
        return [
            'products' => new ProductResource($this->product),
            'photos'   => $this->collection->map(function($photo) {
                return new ProductPhotoResource($photo, true);
            })
        ];
    }
}
