<?php

namespace CodeShopping\Rules;

use Illuminate\Contracts\Validation\Rule;
use CodeShopping\Firebase\Auth as FirebaseAuth;
use Exception;

class FirebaseTokenVerification implements Rule
{
    public function __construct() {}

    public function passes($attribute, $token)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        try {
            $firebaseAuth->user($token);
            return true;
        } catch (Exception $e) {
            return false;
        }
        
    }

    public function message()
    {
        return 'Firebase token is invalid.';
    }
}
