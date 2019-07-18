<?php

declare(strict_types=1);

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class UserProfile extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_USERS = 'users';
    const DIR_USER_PHOTO  = self::DIR_USERS . '/photos';
    const USER_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_USER_PHOTO;

    protected $fillable = [
        'photo', 
        'phone_number'
    ];

    public static function saveProfile(User $user, array $data): UserProfile
    {
        $data['photo'] = self::getPhotoHashName($data['photo']);
        $user->profile->fill($data)->save();
        return $user->profile;
    }

    private static function getPhotoHashName(UploadFile $photo = null) 
    {
        return $photo ? $photo->hashName() : null;
    }

    public static function photoPath()
    {
        $path = self::USER_PHOTO_PATH;
        return storage_path($path);
    }

    public static function uploadPhoto(UploadedFile $photo = null) 
    {
        if (!$photo) {
            return;
        }
        $dir = self::photoDir();
        $photo->store($dir, [
            'disk' => 'public'
        ]);
    }

    public static function photoDir()
    {
        $dir = self::DIR_USER_PHOTO;
        return $dir;
    }

    public static function deletePhoto(UploadedFile $photo = null) 
    {
        if (!$photo) {
            return;
        }
        $path = self::photoPath();
        $photoPath = "{$path}/{$photo->hashName()}";
        if (file_exists($photoPath)) {
            unlink($photoPath);
        }
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}
