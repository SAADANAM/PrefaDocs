<?php

namespace Database\Factories;

use App\Models\ArchiveBox;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['invoice', 'contract', 'report', 'letter', 'receipt', 'form', 'manual', 'certificate'];
        $years = range(2020, 2024);

        return [
            'name' => fake()->words(3, true) . ' Document',
            'category' => fake()->randomElement($categories),
            'year' => fake()->randomElement($years),
            'archive_box_id' => ArchiveBox::inRandomOrder()->first() ?? ArchiveBox::factory(),
            'user_id' => User::inRandomOrder()->first() ?? User::factory(),
        ];
    }
}
