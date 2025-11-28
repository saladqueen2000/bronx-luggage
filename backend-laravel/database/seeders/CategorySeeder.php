<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'Luggage', 'gender' => 0],
            ['name' => 'Backpacks', 'gender' => 0],
            ['name' => 'Handbags', 'gender' => 1],
            ['name' => 'Travel Bags', 'gender' => 0],
        ];

        Category::insert($categories);
    }
}
