<?php

namespace Database\Factories;

use App\Models\Notes;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notes>
 */
class NotesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Notes::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->name,
            'active' => $this->faker->boolean,
            'data' => json_encode([
                'key_1' => $this->faker->randomNumber(),
                'key_2' => $this->faker->sentence,
            ]),

        ];
    }
}
