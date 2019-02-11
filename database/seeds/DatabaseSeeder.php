<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(CategoriesTableSeeder::class);
        $this->call(ProductsTableSeeder::class);
        $this->call(ProductInputsTableSeeder::class);
        $this->call(ProductOutputsTableSeeder::class);
        $this->call(ProductPhotosTableSeeder::class);
    }
}
