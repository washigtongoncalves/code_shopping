<?php

namespace CodeShopping\Providers;

use Illuminate\Support\ServiceProvider;
use CodeShopping\Models\ProductInput;
use CodeShopping\Models\ProductOutput;
use Exception;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        ProductInput::created(function(ProductInput $input) {
            // Incrementa o estoque do produto
            $product = $input->product;
            $product->stock += $input->amount;
            $product->save();
        });
        
        ProductOutput::created(function(ProductOutput $output) {
            // Decrementa o estoque do produto
            $product = $output->product;
            $product->stock -= $output->amount;
            if ($product->stock < 0) {
                throw new Exception("O estoque do produto [{$product->name}] não pode ser negativo");
            }
            $product->save();
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
