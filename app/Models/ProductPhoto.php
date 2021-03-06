<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Exception;

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
        try {
            self::uploadFiles($productId, $files);
            \DB::beginTransaction();
            $photos = self::createPhotosModels($productId, $files);
            \DB::commit();
            return new Collection($photos);
        } catch(Exception $e) {
            self::deleteFiles($productId, $files);
            \DB::rollBack();
            throw $e;
        }
    }
    
    private static function deleteFiles(int $productId, array $files) 
    {
        $path = self::photosPath($productId);
        foreach ($files as $file) {
            $photoPath = "{$path}/{$file->hashName()}";
            self::deleteFile($photoPath);
        }
    }
    
    public static function deleteFile(string $photoPath)
    {
        if (file_exists($photoPath)) {
            \File::delete($photoPath);
        }
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
        return $this->belongsTo(Product::class)->withTrashed();
    }
    
    public function getPhotoUrlAttribute()
    {
        $path = self::photosDir($this->product_id);
        return asset("/storage/{$path}/{$this->file_name}");
    }
    
    public function getPhotoPathAttribute() : string
    {
        $path = self::photosPath($this->product_id);
        $photoPath = "{$path}/{$this->file_name}";
        return $photoPath;    
    }
    
    public function deleteWithPhotoFile() : bool
    {
        try {
            \DB::beginTransaction();
            $this->delete();
            self::deleteFile($this->photo_path);
            \DB::commit();
            return true;
        } catch(Exception $e) {
            \DB::rollBack();
            throw $e;
        }
    }
    
    public function updatePhotoFile(UploadedFile $file) : bool
    {
        try {
            
            // Salva o novo arquivo no storage
            self::uploadFiles($this->product_id, [$file]);
            
            \DB::beginTransaction();
            
            // Atualiza o nome do arquivo
            $oldPath = $this->photo_path;
            $this->file_name = $file->hashName();
            $this->save();
            
            // Remove o arquivo antigo
            self::deleteFile($oldPath);
            \DB::commit();
            
        } catch (Exception $e) {
            self::deleteFiles($this->product_id, [$file]);
            \DB::rollBack();
            throw $e;
        }
        
        return true;
    }
}
