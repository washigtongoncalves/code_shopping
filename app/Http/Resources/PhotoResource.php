<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PhotoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'file_name'  => $this->file_name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
