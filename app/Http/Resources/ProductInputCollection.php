<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use CodeShopping\Models\Product;

class ProductInputCollection extends ResourceCollection
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
            'inputs'  => $this->collection->map(function($input) {
                return new ProductInputResource($input);
            })
        ];
    }
}
