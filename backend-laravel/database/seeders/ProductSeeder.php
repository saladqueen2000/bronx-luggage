<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductGallery;

class ProductSeeder extends Seeder
{
    public function run()
    {
        for ($i = 1; $i <= 30; $i++) {

            $product = Product::create([
                'category_id' => rand(1, 4),
                'brand_id' => rand(1, 5),
                'name' => 'Product ' . $i,
                'description' => 'Sample description for product ' . $i,
                'price' => rand(50, 500),
                'gender' => rand(0, 1),
                'quantity' => rand(5, 100),   // thêm quantity
                'views' => 0,                 // nếu bạn có cột views thì để luôn
                'created_at' => now(),
            ]);

            // Colors pivot
            $product->colors()->sync([
                rand(1, 5),
                rand(1, 5)
            ]);

            // Sizes pivot
            $product->sizes()->sync([
                rand(1, 4),
                rand(1, 4)
            ]);

            // Gallery
            for ($g = 1; $g <= 3; $g++) {
                ProductGallery::create([
                    'product_id' => $product->id,
                    'image_url' => "https://picsum.photos/800/600?random=" . rand(1, 200)
                ]);
            }
        }
    }
}
