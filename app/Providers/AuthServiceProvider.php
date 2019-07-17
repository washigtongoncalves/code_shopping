<?php

namespace CodeShopping\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use CodeShopping\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'CodeShopping\Model' => 'CodeShopping\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Cria uma validação para verificar se o usuário é um vendedor
        \Gate::define('is_seller', function($user) {
            return $user->role === User::ROLE_SELLER;
        });
    }
}
