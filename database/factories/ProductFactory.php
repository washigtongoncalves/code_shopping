<?php

use Faker\Generator as Faker;

$factory->define(CodeShopping\Models\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'slug' => $faker->slug,
        'description' => $faker->paragraph(2),
        'price' => $faker->numberBetween(1, 1000)
    ];
});
