<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class CategoryFilter extends SimpleQueryFilter
{
    protected $simpleFilters = [
        'id', 
        'name', 
        'active', 
        'created_at'
    ];
    
    protected $simpleSorts = [
        'id',
        'name',
        'created_at'
    ];

    protected function applySearch($value)
    {
        $this->query->where('name', 'like', "%{$value}%");
    }
}