<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Column;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Archive>
 */
class ArchiveFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['active', 'inactive', 'archived'];

        return [
            'title' => fake()->words(3, true) . ' Archive',
            'reference_code' => fake()->regexify('[A-Z]{2}[0-9]{3}'),
            'date_archived' => fake()->dateTimeBetween('-2 years', 'now'),
            'status' => fake()->randomElement($statuses),
            'column_id' => Column::inRandomOrder()->first() ?? Column::factory(),
        ];
    }
}
