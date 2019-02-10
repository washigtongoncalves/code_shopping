<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\ProductOutput;
use CodeShopping\Models\Product;

class ProductOutputsTableSeeder extends Seeder
{
    public function run()
    {
        $products = Product::all();
        factory(ProductOutput::class, 10)->make()->each(function(ProductOutput $productOutput) use($products) {
            // Vincula um produto aleatório a uma nova saída
            $product = $products->random();
            $productOutput->product_id = $product->id;
            $productOutput->save();
        });
    }
}
