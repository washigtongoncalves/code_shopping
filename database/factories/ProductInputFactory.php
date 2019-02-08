<?php

use Faker\Generator as Faker;
use CodeShopping\Models\ProductInput;
use CodeShopping\Models\Product;

$factory->define(ProductInput::class, function (Faker $faker) {
    $products = Product::all();
    return [
        'amount'     => $faker->numberBetween(1, 10000),
        'product_id' => $products->random()->id
    ];
});
