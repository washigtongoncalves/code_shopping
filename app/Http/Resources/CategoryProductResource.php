<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'category' => new CategoryResource($this->resource),
            'products' => ProductResource::collection($this->resource->products)
        ];
    }
}
