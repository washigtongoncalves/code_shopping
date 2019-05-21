<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductInputFilter extends SimpleQueryFilter
{
    protected $simpleFilters = [
        'search'
    ];
    
    protected $simpleSorts = [
        'id',
        'amount',
        'created_at'
    ];

    protected function applyCreatedAt($value)
    {
        $this->query->whereRaw('DATE(created_at) = ? ', [$value]);
    }

    protected function applySearch($value)
    {
        /*
        $this->query->where('name', 'like', "%{$value}%")
                    ->orWhere('description', 'like', "%{$value}%");
        */
    }
}