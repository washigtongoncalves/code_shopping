<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;

class ProductPhotosTableSeeder extends Seeder
{
    public function run()
    {
       $this->deleteAllPhotosInProductsPath();
       $self = $this;
       $products = Product::all();
       $products->each(function(Product $product) use($self) {
           $self->createPhotoDir($product);
           $self->createPhotosModels($product);
       });
    }
    
    private function deleteAllPhotosInProductsPath()
    {
        $path = ProductPhoto::PRODUCTS_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }
    
    private function createPhotoDir(Product $product) 
    {
        $path = ProductPhoto::photosPath($product->id);
        \File::makeDirectory($path, 0777, true);
    }
    
    private function createPhotosModels(Product $product)
    {
        foreach(range(1, 5) as $i) {
            $this->createPhotoModel($product);
        }
    }
    
    private function createPhotoModel(Product $product)
    {
        ProductPhoto::create([
            'product_id' => $product->id,
            'file_name'  => 'img.jpg'
        ]);
    }
}
