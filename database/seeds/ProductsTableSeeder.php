<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\Product;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        factory(Product::class, 500)->create();
    }
}
