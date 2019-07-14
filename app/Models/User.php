<?php

namespace CodeShopping\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes, Filterable;

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];
    
    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
    
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
