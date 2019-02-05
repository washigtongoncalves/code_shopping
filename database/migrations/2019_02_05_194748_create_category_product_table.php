<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryProductTable extends Migration
{
    public function up()
    {
        Schema::create('category_product', function (Blueprint $table) {
            $table->integer('product_id') ->unsigned();
            $table->integer('category_id')->unsigned();
            $table->foreign('product_id') ->references('id')->on('products');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->primary(['product_id', 'category_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('category_product');
    }
}
