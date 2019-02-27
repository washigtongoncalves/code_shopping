<?php

namespace CodeShopping\Listeners;

use CodeShopping\Events\UserCreatedEvent;

class SendMailToDefinePassword
{
    public function handle(UserCreatedEvent $event)
    {
        $user = $event->getUser();
        $token = \Password::broker()->createToken($user);
        $user->sendPasswordResetNotification($token);
    }
}
