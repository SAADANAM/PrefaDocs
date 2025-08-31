<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shelf>
 */
class ShelfFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->regexify('S[0-9]{3}'),
            'room_name' => fake()->words(2, true) . ' Room',
            'total_capacity' => fake()->numberBetween(50, 200),
            'used_space' => fake()->numberBetween(0, 150),
        ];
    }
}
