<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rating;

class RatingSeeder extends Seeder
{
    public function run()
    {
        for ($i = 1; $i <= 20; $i++) {
            Rating::create([
                'user_id' => rand(1, 6),
                'product_id' => rand(1, 10),
                'rating' => rand(1, 5),
                'comment' => 'This is a sample review.',
                'created_at' => now(),
            ]);
        }
    }
}
