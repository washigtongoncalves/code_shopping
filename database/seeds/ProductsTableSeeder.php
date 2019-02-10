<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\Product;
use CodeShopping\Models\Category;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        $categories = Category::all();
        factory(Product::class, 50)->create()->each(function(Product $products) use($categories) {
            $categoryId = $categories->random()->id;
            $products->categories()->attach($categoryId);
        });
    }
}
