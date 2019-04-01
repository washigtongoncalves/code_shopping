<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\{Model, SoftDeletes};
use Cviebrock\EloquentSluggable\Sluggable;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Product extends Model
{
    use Sluggable, SoftDeletes, Filterable;
    
    protected $dates = ['deleted_at'];
    protected $fillable = ['name', 'description', 'price', 'active'];
    
    public function sluggable(): array 
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
    
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
    
    public function photos()
    {
        return $this->hasMany(ProductPhoto::class);
    }
}
