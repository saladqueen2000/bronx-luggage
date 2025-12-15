<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RatingSeeder extends Seeder
{
    public function run()
    {
        $products = DB::table('products')->pluck('id')->toArray();
        $users = DB::table('users')->pluck('id')->toArray();

        foreach ($products as $productId) {


            $count = rand(5, 25);

            for ($i = 0; $i < $count; $i++) {
                DB::table('ratings')->insert([
                    'user_id' => $users[array_rand($users)],
                    'product_id' => $productId,
                    'rating' => rand(1, 5),
                    'comment' => $this->randomComment(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    // Comment mẫu
    private function randomComment()
    {
        $comments = [
            'Great product!',
            'Very good quality.',
            'Not bad at all.',
            'Could be better.',
            'Excellent value for money.',
            'I am satisfied with this purchase.',
            'Decent product for the price.',
            'Highly recommended.',
            'Quality could be improved.',
            'Amazing item!'
        ];

        return $comments[array_rand($comments)];
    }
}
