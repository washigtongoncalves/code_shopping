<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductOutputsTable extends Migration
{
    public function up()
    {
        Schema::create('product_outputs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->unsigned();
            $table->integer('amount')->default(0);
            $table->foreign('product_id')->references('id')->on('products');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_outputs');
    }
}
