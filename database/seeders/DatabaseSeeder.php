<?php

namespace Database\Seeders;

use App\Models\Archive;
use App\Models\ArchiveBox;
use App\Models\Column;
use App\Models\Document;
use App\Models\DocumentRequest;
use App\Models\Rack;
use App\Models\Shelf;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create 4 normal users
        User::factory(4)->create();

        // Create storage hierarchy
        $shelves = Shelf::factory(5)->create();
        $racks = collect();
        $columns = collect();

        foreach ($shelves as $shelf) {
            $shelfRacks = Rack::factory(3)->create(['shelf_id' => $shelf->id]);
            $racks = $racks->merge($shelfRacks);
            
            foreach ($shelfRacks as $rack) {
                $rackColumns = Column::factory(4)->create(['rack_id' => $rack->id]);
                $columns = $columns->merge($rackColumns);
            }
        }

        // Create archives
        $archives = Archive::factory(8)->create();

        // Create 10 archive boxes
        $archiveBoxes = ArchiveBox::factory(10)->create();

        // Create 20 documents linked to archive boxes and users
        $users = User::where('role', 'user')->get();
        $documents = collect();

        for ($i = 0; $i < 20; $i++) {
            $document = Document::factory()->create([
                'archive_box_id' => $archiveBoxes->random()->id,
                'user_id' => $users->random()->id,
            ]);
            $documents->push($document);
        }

        // Create 15 document requests with mixed statuses
        for ($i = 0; $i < 15; $i++) {
            DocumentRequest::factory()->create([
                'user_id' => $users->random()->id,
                'document_id' => $documents->random()->id,
            ]);
        }
    }
}
