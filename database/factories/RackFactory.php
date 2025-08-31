<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Shelf;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rack>
 */
class RackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->regexify('R[0-9]{3}'),
            'shelf_id' => Shelf::inRandomOrder()->first() ?? Shelf::factory(),
            'length' => fake()->numberBetween(100, 200),
            'width' => fake()->numberBetween(50, 100),
            'number_of_shelves' => fake()->numberBetween(1, 5),
        ];
    }
}
