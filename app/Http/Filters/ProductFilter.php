<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductFilter extends SimpleQueryFilter
{
    protected $simpleFilters = [
        'search'
    ];
    
    protected $simpleSorts = [
        'id',
        'name',
        'price',
        'stock',
        'created_at'
    ];

    protected function applySearch($value)
    {
        $this->query->where('name', 'like', "%{$value}%")
                    ->orWhere('description', 'like', "%{$value}%");
    }
}