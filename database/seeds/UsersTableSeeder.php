<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        factory(User::class, 100)->create();
    }
}
