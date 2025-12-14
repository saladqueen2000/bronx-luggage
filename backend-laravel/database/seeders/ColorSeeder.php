<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Color;

class ColorSeeder extends Seeder
{
    public function run()
    {
        $colors = [
            ['name' => 'Black', 'hex' => '#000000'],
            ['name' => 'Blue', 'hex' => '#1976d2'],
            ['name' => 'Red', 'hex' => '#d32f2f'],
            ['name' => 'Gray', 'hex' => '#9e9e9e'],
            ['name' => 'Green', 'hex' => '#2e7d32'],
        ];

        foreach ($colors as $color) {
            Color::updateOrCreate(
                ['name' => $color['name']],
                ['hex' => $color['hex']]
            );
        }
    }
}

