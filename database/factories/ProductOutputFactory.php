<?php

use Faker\Generator as Faker;
use CodeShopping\Models\ProductOutput;

$factory->define(ProductOutput::class, function (Faker $faker) {
    return [
        'amount' => $faker->numberBetween(1, 2)
    ];
});
