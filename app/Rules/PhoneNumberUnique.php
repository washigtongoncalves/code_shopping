<?php

namespace CodeShopping\Rules;

use Illuminate\Contracts\Validation\Rule;
use CodeShopping\Firebase\Auth as FirebaseAuth;
use CodeShopping\UserProfile;
use Exception;

class PhoneNumberUnique implements Rule
{
    public function passes($attribute, $token)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        try {
            $phoneNumber = $firebaseAuth->phoneNumber($token);
            $userProfile = UserProfile::where('phone_number', $phoneNumber)->first();
            return is_null($userProfile);
        } catch (Exception $e) {
            return false;
        }
    }

    public function message()
    {
        return 'Phone number has used';
    }
}
