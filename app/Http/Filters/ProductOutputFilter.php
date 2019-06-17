<?php

namespace CodeShopping\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductOutputFilter extends SimpleQueryFilter
{
    protected $simpleFilters = [
        'search'
    ];
    
    protected $simpleSorts = [
        'id',
        'product_name',
        'amount',
        'created_at'
    ];

    protected function applySearch($value)
    {
        $this->query->where('products.name', 'like', "%{$value}%");
    }

    protected function applySortProductName($order)
    {
        $this->query->orderBy('products.name', $order);
    }

    protected function applySortCreatedAt($order)
    {
        $this->query->orderBy('product_outputs.created_at', $order);
    }

    public function apply($query) 
    {
        $query = $query->select('product_outputs.*')
        ->join(
            'products', 
            'products.id', 
            '=', 
            'product_outputs.product_id'
        );
        return parent::apply($query);
    }
}