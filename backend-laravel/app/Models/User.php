<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // ⚠ Quan trọng
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // ⚠ Quan trọng
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'fullname',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
