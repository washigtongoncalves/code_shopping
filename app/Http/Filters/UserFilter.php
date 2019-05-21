<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class UserFilter extends SimpleQueryFilter
{
    protected $simpleFilters = [
        'search'
    ];
    
    protected $simpleSorts = [
        'id',
        'name',
        'email',
        'created_at'
    ];

    protected function applyCreatedAt($value)
    {
        $this->query->whereRaw('DATE(created_at) = ? ', [$value]);
    }

    protected function applySearch($value)
    {
        $this->query->where('name', 'like', "%{$value}%")
                    ->orWhere('email', 'like', "%{$value}%");
    }
}