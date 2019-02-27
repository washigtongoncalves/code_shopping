<?php

namespace CodeShopping\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        'CodeShopping\Events\Event' => [
            'CodeShopping\Listeners\EventListener',
        ],
        'CodeShopping\Events\UserCreatedEvent' => [
            'CodeShopping\Listeners\SendMailToDefinePassword',
        ],
    ];

    public function boot()
    {
        parent::boot();
    }
}
