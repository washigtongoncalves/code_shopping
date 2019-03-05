<?php

namespace CodeShopping\Http\Middleware;

use Illuminate\Http\Request;
use Closure;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->is('api/*')) {
            // Libera o request para qualquer origem
            header('Access-Control-Allow-Origin: *');
            // Libera o uso do header Content-Type
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
        }
        return $next($request);
    }
}
