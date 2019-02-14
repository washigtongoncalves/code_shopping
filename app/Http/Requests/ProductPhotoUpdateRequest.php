<?php

namespace CodeShopping\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductPhotoUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'photo' => 'required|image|max:' . (3 * 1024)
        ];
    }
}
