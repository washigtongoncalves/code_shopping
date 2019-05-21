<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class CategoryFilter extends SimpleQueryFilter
{
    protected $simpleFilters = [
        'search'
    ];
    
    protected $simpleSorts = [
        'id',
        'name',
        'created_at'
    ];

    protected function applyCreatedAt($value)
    {
        $this->query->whereRaw('DATE(created_at) = ? ', [$value]);
    }

    protected function applySearch($value)
    {
        $this->query->where('name', 'like', "%{$value}%");
    }
}