<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\CustumerRequest;
use CodeShopping\Firebase\Auth as FirebaseAuth;

class CustumerController extends Controller
{
    public function store(CustumerRequest $request) 
    {
        $data = $request->all();
        $token = $request->token;
        $data['phone_number'] = $this->getPhoneNumber($token);
        $data['photo'] = $data['photo'] ?? null;
        $user = User::createCustomer($data);
        return [
            'token' => \Auth::guard('api')->login($user)
        ];
    }

    private function getPhoneNumber(string $token) 
    {
        $firebaseAuth = app(FirebaseAuth::class);
        return $firebaseAuth->phoneNumber($token);
    }
}