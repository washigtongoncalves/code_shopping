<?php

use Faker\Generator as Faker;

$factory->define(CodeShopping\Models\Product::class, function (Faker $faker) {
    return [
        'name'  => $faker->company,
        'slug'  => $faker->slug,
        'stock' => $faker->numberBetween(100, 1000),
        'description' => $faker->paragraph(2),
        'price' => $faker->randomFloat(2, 100, 1000)
    ];
});
