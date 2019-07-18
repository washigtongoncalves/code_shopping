<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'Api', 'as' => 'api.'], function() {
    
    // Rotas públicas
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('login_vendor', 'AuthController@loginFirebase')->name('login_vendor');
    Route::post('refresh', 'AuthController@refresh')->name('refresh');
    Route::resource('customers', 'CustomerController', ['only' => 'store']);
    
    Route::group(['middleware' => ['auth:api', 'jwt.refresh']], function() {

        // Atualização de perfil, serve para vendedores ou clientes autenticados
        Route::patch('profile', 'UserProfileController@update');
        
        // Rotas exclusivas de vendedores (aplicação Angular)
        Route::group(['middleware' => ['can:is_seller']], function() { 
            Route::post('logout', 'AuthController@logout')->name('logout');
            Route::get('me', 'AuthController@me')->name('me');
            Route::resource('categories', 'CategoryController', ['except' => ['create', 'edit']]);
            Route::patch('products/{product}/restore', 'ProductController@restore')->name('products.restore');
            Route::apiResource('products', 'ProductController');
            Route::resource('products.categories', 'ProductCategoryController', ['only' => ['index', 'store', 'destroy']]);
            Route::resource('products.photos', 'ProductPhotoController', ['except' => ['create', 'edit']]);
            Route::resource('products.inputs', 'ProductInputController', ['except' => ['create', 'edit']]);
            Route::resource('products.outputs', 'ProductOutputController', ['except' => ['create', 'edit']]);
            Route::resource('categories.products', 'CategoryProductController', ['only' => ['index', 'store', 'destroy']]);
            Route::resource('inputs' , 'InputController' , ['only' => ['index']]);
            Route::resource('outputs', 'OutputController', ['only' => ['index']]);
            Route::patch('users/{user}/restore', 'UserController@restore')->name('users.restore');
            Route::apiResource('users', 'UserController');
        });        
    });
});
