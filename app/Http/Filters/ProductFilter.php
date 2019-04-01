<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductFilter extends SimpleQueryFilter
{
    protected $simpleFilters = [
        'id', 
        'name',
        'active', 
        'stock',
        'created_at',
        'search'
    ];
    
    protected $simpleSorts = [
        'id',
        'name',
        'price',
        'stock',
        'created_at'
    ];

    protected function applyCreatedAt($value)
    {
        $this->query->whereRaw('DATE(created_at) = ? ', [$value]);
    }

    protected function applySearch($value)
    {
        $this->query->where('name', 'like', "%{$value}%")
                    ->orWhere('description', 'like', "%{$value}%");
    }
}