<?php

namespace CodeShopping\Traits;

use Illuminate\Database\Eloquent\Builder;

trait OnlyTrashedIfRequestedTrait 
{
    public function onlyTrashedIfRequested(Builder $query)
    {
        if (\Request::get('trashed') == 1) {
            $query = $query->onlyTrashed();
        }
        return $query;
    }
}
