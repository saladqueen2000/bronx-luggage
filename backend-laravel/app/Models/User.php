<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;
    protected $fillable = [
        'fullname',
        'email',
        'password',
        'role',
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
    
    public function getNameAttribute()
    {
        return $this->fullname;
    }

}
