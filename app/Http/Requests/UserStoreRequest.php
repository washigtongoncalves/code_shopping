<?php

namespace CodeShopping\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'  => 'required|filled|max:255',
            'email' => 'required|filled|max:255|email|unique:users',
            'password' => 'required|filled|min:5',
        ];
    }
}
