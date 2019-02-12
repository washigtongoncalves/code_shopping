<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class ProductPhoto extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_PRODUCTS = 'products';
    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;
    
    protected $fillable = ['file_name', 'product_id'];
    
    public static function photosPath(int $productId)
    {
        $path = self::PRODUCTS_PATH;
        return storage_path("{$path}/{$productId}");
    }
    
    public static function uploadFiles(int $productId, array $files) 
    {
        $dir = self::photosDir($productId);
        foreach ($files as $file) {
            $file->store($dir, [
                'disk' => 'public'
            ]);
        }
    }
    
    public static function createWithPhotosFiles(int $productId, array $files) : Collection 
    {
        self::uploadFiles($productId, $files);
        $photos = self::createPhotosModels($productId, $files);
        return new Collection($photos);
    }
    
    private static function createPhotosModels(int $productId, array $files) : array 
    {
        $photos = [];
        foreach ($files as $file) {
            $photos[] = self::create([
                'file_name'  => $file->hashName(),
                'product_id' => $productId
            ]);
        }
        return $photos;
    }
   
    public static function photosDir(int $productId)
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$productId}";
    }
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    
    public function getPhotoUrlAttribute()
    {
        $path = self::photosDir($this->product_id);
        return asset("/storage/{$path}/{$this->file_name}");
    }
}
