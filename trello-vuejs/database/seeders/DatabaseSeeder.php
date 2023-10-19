<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Card;
use App\Models\Desk;
use App\Models\Notes;
use App\Models\Task;
use App\Models\DeskList;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Notes::factory(10)->create();
        Desk::factory(10)->create();
        DeskList::factory(10)->create();
        Card::factory(10)->create();
        Task::factory(10)->create();



    }
}
