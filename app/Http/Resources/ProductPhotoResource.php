<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductPhotoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'product' => new ProductResource($this->resource),
            'photos'  => PhotoResource::collection($this->resource->photos)
        ];
    }
}
