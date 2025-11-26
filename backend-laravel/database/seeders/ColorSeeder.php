<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Color;

class ColorSeeder extends Seeder
{
    public function run()
    {
        $colors = ['Black', 'Blue', 'Red', 'Gray', 'Green'];

        foreach ($colors as $c) {
            Color::create(['name' => $c]);
        }
    }
}
