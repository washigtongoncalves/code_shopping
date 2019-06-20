<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use CodeShopping\Models\Product;

class ProductOutputCollection extends ResourceCollection
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
            'product' => new ProductResource($this->product),
            'outputs' => $this->collection->map(function($output) {
                return new ProductOutputResource($output, true);
            })
        ];
    }
}