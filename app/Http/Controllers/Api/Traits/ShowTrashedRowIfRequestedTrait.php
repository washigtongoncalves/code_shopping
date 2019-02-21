<?php

namespace CodeShopping\Http\Controllers\Api\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

trait ShowTrashedRowIfRequestedTrait 
{
    public function onlyTrashedIfRequested(Request $request, Builder $query)
    {
        if ($request->get('trashed') == 1) {
            $query = $query->onlyTrashed();
        }
        return $query;
    }
}
