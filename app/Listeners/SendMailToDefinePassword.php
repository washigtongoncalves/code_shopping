<?php

namespace CodeShopping\Listeners;

use CodeShopping\Events\UserCreatedEvent;
use CodeShopping\Notifications\MyResetPasswordNotification;

class SendMailToDefinePassword
{
    public function handle(UserCreatedEvent $event)
    {
        $user = $event->getUser();
        $token = \Password::broker()->createToken($user);
        
        // Default email notification
        // $user->sendPasswordResetNotification($token);
        
        // Custom email notification
        $user->notify(new MyResetPasswordNotification($token));
    }
}
