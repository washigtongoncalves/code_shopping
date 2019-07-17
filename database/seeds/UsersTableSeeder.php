<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        factory(User::class, 1)->create([
            'email' => 'admin@user.com'
        ])->each(function($user) {
            $user->profile->phone_number = '+16505551234';
            $user->profile->save();
        });
        factory(User::class, 1)->create([
            'email' => 'customer@user.com',
            'role'  => User::ROLE_CUSTOMER
        ]);
        factory(User::class, 100)->create([
            'role' => User::ROLE_CUSTOMER
        ]);
    }
}
