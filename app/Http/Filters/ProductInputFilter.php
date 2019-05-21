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
        $this->query->where('products.name', 'like', "%{$value}%");
    }

    public function apply($query) 
    {
        $query = $query->select('product_inputs.*')
        ->join(
            'products', 
            'products.id', 
            '=', 
            'product_inputs.product_id'
        );
        return parent::apply($query);
    }
}