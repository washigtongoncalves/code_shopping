<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\User;
use CodeShopping\Http\Resources\UserResource;

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
    
    public function logout() 
    {
        \Auth::guard('api')->logout();
        return response()->json([], 204);
    }
    
    public function me()
    {
        $user = \Auth::guard('api')->user();
        return new UserResource($user);
    }
    
    public function refresh()
    {
        $token = \Auth::guard('api')->refresh();
        return compact('token');
    }
}
