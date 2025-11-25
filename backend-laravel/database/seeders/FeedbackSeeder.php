<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Feedback;

class FeedbackSeeder extends Seeder
{
    public function run()
    {
        for ($i = 1; $i <= 5; $i++) {
            Feedback::create([
                'name' => 'User ' . $i,
                'email' => "user{$i}@example.com",
                'message' => "This is feedback message number {$i}.",
                'created_at' => now(),
            ]);
        }
    }
}
