<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Document;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DocumentRequest>
 */
class DocumentRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['pending', 'approved', 'rejected'];
        $status = fake()->randomElement($statuses);
        
        return [
            'user_id' => User::inRandomOrder()->first() ?? User::factory(),
            'document_id' => Document::inRandomOrder()->first() ?? Document::factory(),
            'status' => $status,
            'requested_at' => fake()->dateTimeBetween('-30 days', 'now'),
            'responded_at' => $status !== 'pending' ? fake()->dateTimeBetween('-30 days', 'now') : null,
        ];
    }
}
