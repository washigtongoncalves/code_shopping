<?php

declare(strict_types=1);

use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Http\UploadedFile;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;

class ProductPhotosTableSeeder extends Seeder
{
    /** 
     * Atributo para armazenar uma coleção de nomes de arquivos 
     * armazenados dentro do diretório $fakerPhotosPath
     */
    private $allFakersPhotos;
    
    // Diretório com as imagens fakes
    private $fakerPhotosPath = 'app/faker/product_photos';
    
    public function run()
    {
       // Retorna uma coleção com as imagens fakes que serão utilizadas na seeder
       $this->allFakersPhotos = $this->getFakerPhotos();
       
       // Remove todos os arquivos e pastas que estão armazenadas na pasta public/products
       $this->deleteAllPhotosInProductsPath();
       
       $self = $this;
       $products = Product::all();
       $products->each(function(Product $product) use($self) {
           $self->createPhotoDir($product);
           $self->createPhotosModels($product);
       });
    }
    
    private function getFakerPhotos() : Collection
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(\File::allFiles($path));
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
        $photo = ProductPhoto::create([
            'product_id' => $product->id,
            'file_name'  => 'img.jpg'
        ]);
        $this->generatePhoto($photo);
    }
    
    private function generatePhoto(ProductPhoto $photo) 
    {
        $photo->file_name = $this->uploadPhoto($photo->product_id);
        $photo->save();
    }
    
    private function uploadPhoto(int $productId) : string
    {
        $photoFile  = $this->allFakersPhotos->random();
        $uploadFile = new UploadedFile(
            $photoFile->getRealPath(),
            str_random(16) . '.' . $photoFile->getExtension()   
        );
        ProductPhoto::uploadFiles($productId, [$uploadFile]);
        return $uploadFile->hashName();
    }
}
