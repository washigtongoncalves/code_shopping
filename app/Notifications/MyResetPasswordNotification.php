<?php

namespace CodeShopping\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class MyResetPasswordNotification extends Notification
{
    use Queueable;
    
    private $token;
    
    public function __construct(string $token) 
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject(Lang::getFromJson('Solicitação de Alteração de Senha'))
            ->line(Lang::getFromJson('Você recebeu este e-mail porque recebemos uma solicitação de alteração de senha de sua conta.'))
            ->action(Lang::getFromJson('Alterar Senha'), url(config('app.url').route('password.reset', $this->token, false)))
            ->line(Lang::getFromJson('Caso não tenha solicitado, favor, ignorar.'));
    }
}
