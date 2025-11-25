<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Size;

class SizeSeeder extends Seeder
{
    public function run()
    {
        $sizes = ['S', 'M', 'L', 'XL'];

        foreach ($sizes as $label) {
            Size::create(['label' => $label]);
        }
    }
}
