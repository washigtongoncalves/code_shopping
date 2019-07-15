<?php

namespace CodeShopping\Http\Middleware;

use Illuminate\Http\Request;
use Closure;

class CorsMiddleware
{
    private $origins = [
        'http://localhost:4200', // Angular Web App
        'http://localhost:8100'  // Ionic App
    ];

    public function handle(Request $request, Closure $next)
    {
        $requestOrigin = $request->headers->get('Origin');
        if (in_array($requestOrigin, $this->origins)) {
            $allowOrigin = $requestOrigin;
        }

        if ($request->is('api/*')) {
            if (isset($allowOrigin)) {
                // Libera o request para a origem
                header("Access-Control-Allow-Origin: {$allowOrigin}");
            }
            // Libera o uso do header Content-Type
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
            // Libera o uso dos seguintes métodos HTTP
            header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE');
            // Libera o uso dos seguintes headers 
            header('Access-Control-Expose-Headers: Authorization');
        }
        return $next($request);
    }
}
