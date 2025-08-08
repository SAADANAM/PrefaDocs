<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CheckUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check all users and their roles';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = User::all();
        
        $this->info('Users in database:');
        $this->table(
            ['ID', 'Name', 'Email', 'Role', 'Is Admin'],
            $users->map(function ($user) {
                return [
                    $user->id,
                    $user->name,
                    $user->email,
                    $user->role,
                    $user->isAdmin() ? 'Yes' : 'No'
                ];
            })->toArray()
        );
        
        return Command::SUCCESS;
    }
}
