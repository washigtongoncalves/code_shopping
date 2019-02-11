<?php

namespace CodeShopping\Rules;

use Illuminate\Contracts\Validation\Rule;
use CodeShopping\Models\Product;

class HasStock implements Rule
{
    private $product;
    
    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    public function passes($attribute, $value)
    {
        return $this->product->stock - $value >= 0;
    }

    public function message()
    {
        return "The product [{$this->product->name}] doesn't have sufficient stock to output";
    }
}
