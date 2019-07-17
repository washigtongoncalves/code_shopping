<?php

declare(strict_types=1);

namespace CodeShopping\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;
use Exception;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes, Filterable;

    const ROLE_SELLER = 1;   // Vendedor
    const ROLE_CUSTOMER = 2; // Cliente

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];
    
    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public static function createCustomer(array $data): User
    {
        try {
            UserProfile::uploadPhoto($data['photo']);
            \DB::beginTransaction();
            \DB::commit();
        } catch (Exception $e) {
            // Remover a foto
            \DB::rollback();
            throw $e;
        }
    }
    
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function getJWTCustomClaims() : array 
    {
        return [
            'name'  => $this->name,
            'email' => $this->email,
        ];
    }

    public function getJWTIdentifier() 
    {
        return $this->id;
    }

    public function profile() 
    {
        return $this->hasOne(UserProfile::class)->withDefault(); // Padrão de Projeto Null
    }
}
