<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductPhotoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'product'    => new ProductResource($this->resource->product),
            'photo_url'  => $this->photo_url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
