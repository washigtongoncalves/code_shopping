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
            // Vincula um produto aleatório a uma nova entrada
            $product = $products->random();
            $productInput->product_id = $product->id;
            $productInput->save();
        });
    }
}
