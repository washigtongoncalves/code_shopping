<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\ProductInput;
use CodeShopping\Models\Product;

class ProductInputsTableSeeder extends Seeder
{
    public function run()
    {
        $products = Product::all();
        factory(ProductInput::class, 100)->make()->each(function(ProductInput $productInput) use($products) {
            $productInput->product_id = $products->random()->id;
            $productInput->save();
        });
    }
}
