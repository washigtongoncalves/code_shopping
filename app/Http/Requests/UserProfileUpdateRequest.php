<?php

namespace CodeShopping\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use CodeShopping\Rules\{FirebaseTokenVerification, PhoneNumberUnique};

class UserProfileUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $userId = \Auth::guard('api')->user()->id;
        return [
            'name'  => 'max:255',
            'email' => "email|unique:users,email,{$userId}",
            'password' => 'min:5',
            'photo' => 'image|max' . (3 * 1024),
            'token' => [
                new FirebaseTokenVerification(),
                new PhoneNumberUnique($userId)
            ]
        ];
    }
}
