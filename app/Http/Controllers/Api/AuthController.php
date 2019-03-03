<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use CodeShopping\Http\Controllers\Controller;

class AuthController extends Controller
{
    use AuthenticatesUsers;
    
    public function login(Request $request)
    {
        $this->validateLogin($request);
        $credentials = $this->credentials($request);
        $token = \JWTAuth::attempt($credentials);
        return $token ? compact('token') : response()->json([
            'error' => \Lang::get('auth.failed')
        ], 400);
    }
}
