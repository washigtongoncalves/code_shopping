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
            $user = self::createCustomerUser($data);
            UserProfile::saveProfile($user, $data);
            \DB::commit();
        } catch (Exception $e) {
            UserProfile::deleteFile($data);
            \DB::rollBack();
            throw $e;
        }
        return $user;
    }

    private static function createCustomerUser(array $data): User
    {
        $data['password'] = bcrypt(str_random(16));
        $user = self::create($data);
        $user->role = self::ROLE_CUSTOMER;
        $user->save();
        return $user;
    }

    public function updateWithProfile(array $data): User 
    {
        try {
            UserProfile::uploadPhoto($data['photo']);
            \DB::beginTransaction();
            $this->fill($data)->save();
            UserProfile::saveProfile($this, $data);
            \DB::commit();
        } catch (Exception $e) {
            UserProfile::deleteFile($data);
            \DB::rollBack();
            throw $e;
        }
        return $this;
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
