<?php

namespace CodeShopping\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use CodeShopping\Models\Product;
use CodeShopping\Rules\HasStock;

class ProductOutputRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $product = Product::findOrFail($this->product_id);
        return [
            'amount' => ['required', 'integer', 'min:1', new HasStock($product)]
        ];
    }
}
