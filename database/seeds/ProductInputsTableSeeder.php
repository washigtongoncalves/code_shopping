<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\ProductInput;

class ProductInputsTableSeeder extends Seeder
{
    public function run()
    {
        factory(ProductInput::class, 100)->create();
    }
}
