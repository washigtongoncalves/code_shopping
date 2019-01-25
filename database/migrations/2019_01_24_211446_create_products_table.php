<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('slug');
            $table->text('description');
            $table->decimal('price', 16, 2)->default(0.00);
            $table->integer('stock')->unsigned()->default(0);
            $table->boolean('active')->default(1);
            // $table->unique('name', 'uk_products_name');
            // $table->unique('slug', 'uk_products_slug');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
