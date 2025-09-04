<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('products')->insert([
            [
                'name' => 'Wireless Mouse',
                'qty' => 50,
                'price' => 19.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mechanical Keyboard',
                'qty' => 30,
                'price' => 89.50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'USB-C Charger',
                'qty' => 100,
                'price' => 24.90,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Noise Cancelling Headphones',
                'qty' => 20,
                'price' => 129.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ergonomischer Bürostuhl',
                'qty' => 15,
                'price' => 249.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'HD Webcam mit Mikrofon',
                'qty' => 40,
                'price' => 59.95,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
