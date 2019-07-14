<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use CodeShopping\Firebase\Auth as FirebaseAuth;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\{User, UserProfile};
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Rules\FirebaseTokenVerification;

class AuthController extends Controller
{
    use AuthenticatesUsers;
    
    public function login(Request $request)
    {
        $this->validateLogin($request);
        $credentials = $this->credentials($request);
        $token = \JWTAuth::attempt($credentials);
        return $this->responseToken($token);
    }

    public function loginFirebase(Request $request) 
    {
        $this->validate($request, [
            'token' => new FirebaseTokenVerification
        ]);
        $firebaseAuth = app(FirebaseAuth::class);
        $user = $firebaseAuth->user($request->token);
        $profile = UserProfile::where('phone_number', $user->phoneNumber)->first();
        $token = null;
        if ($profile) {
            $token = \Auth::guard('api')->login($profile->user);
        }
        return $this->responseToken($token);
    }

    private function responseToken($token) 
    {
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
