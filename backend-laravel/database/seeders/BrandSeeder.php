<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    public function run()
    {
        $brands = [
            ['name' => 'Samsonite', 'description' => 'High-end luggage', 'logo' => 'samsonite.png'],
            ['name' => 'American Tourister', 'description' => 'Durable and stylish', 'logo' => 'american.png'],
            ['name' => 'Tumi', 'description' => 'Premium luxury bags', 'logo' => 'tumi.png'],
            ['name' => 'Adidas', 'description' => 'Sport backpacks', 'logo' => 'adidas.png'],
            ['name' => 'Nike', 'description' => 'Sports travel bags', 'logo' => 'nike.png'],
        ];

        Brand::insert($brands);
    }
}
