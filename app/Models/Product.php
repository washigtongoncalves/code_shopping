<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Product extends Model
{
    use Sluggable;
    
    protected $fillable = ['name', 'description', 'price', 'price'];
    
    public function sluggable(): array 
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
}
