<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Tạo admin
        User::create([
            'fullname' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'), // mật khẩu admin
            'role' => 'admin'
        ]);

        // Tạo 5 user thường
        for ($i = 1; $i <= 5; $i++) {
            User::create([
                'fullname' => 'User ' . $i,
                'email' => 'user' . $i . '@example.com',
                'password' => Hash::make('user123'), // mật khẩu user
                'role' => 'user'
            ]);
        }
    }
}
