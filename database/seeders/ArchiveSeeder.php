<?php

namespace Database\Seeders;

use App\Models\Archive;
use App\Models\ArchiveBox;
use App\Models\Column;
use App\Models\Document;
use App\Models\Rack;
use App\Models\Room;
use App\Models\Shelf;
use App\Models\Site;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ArchiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create regular user
        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // Create sample site
        $site = Site::create([
            'code' => 'HQ',
            'label' => 'Headquarters',
        ]);

        // Create sample rooms
        $room1 = Room::create([
            'name' => 'Main Archive Room',
            'description' => 'Primary storage room for active documents',
            'capacity' => 1000,
            'floor' => 1,
            'location' => 'Main building, ground floor',
            'site_id' => $site->id,
            'number_of_racks' => 5,
        ]);

        $room2 = Room::create([
            'name' => 'Secondary Archive Room',
            'description' => 'Secondary storage room for older documents',
            'capacity' => 800,
            'floor' => 2,
            'location' => 'Annex building, first floor',
            'site_id' => $site->id,
            'number_of_racks' => 3,
        ]);

        // Create sample shelves with capacity data
        $shelf1 = Shelf::create([
            'name' => 'Main Storage Shelf 1',
            'location_description' => 'Main building, ground floor',
            'room_id' => $room1->id,
            'room_name' => $room1->name,
            'shelf_dimensions' => '200cm x 80cm x 40cm',
            'depth' => 40.0,
            'total_capacity' => 6400, // 200 * 80 * 0.4
            'used_space' => 3200, // 50% used
        ]);

        $shelf2 = Shelf::create([
            'name' => 'Main Storage Shelf 2',
            'location_description' => 'Main building, ground floor',
            'room_id' => $room1->id,
            'room_name' => $room1->name,
            'shelf_dimensions' => '200cm x 80cm x 40cm',
            'depth' => 40.0,
            'total_capacity' => 6400,
            'used_space' => 1280, // 20% used
        ]);

        $shelf3 = Shelf::create([
            'name' => 'Secondary Storage Shelf 1',
            'location_description' => 'Annex building, first floor',
            'room_id' => $room2->id,
            'room_name' => $room2->name,
            'shelf_dimensions' => '180cm x 75cm x 35cm',
            'depth' => 35.0,
            'total_capacity' => 4725, // 180 * 75 * 0.35
            'used_space' => 3780, // 80% used
        ]);

        $shelf4 = Shelf::create([
            'name' => 'Secondary Storage Shelf 2',
            'location_description' => 'Annex building, first floor',
            'room_id' => $room2->id,
            'room_name' => $room2->name,
            'shelf_dimensions' => '180cm x 75cm x 35cm',
            'depth' => 35.0,
            'total_capacity' => 4725,
            'used_space' => 4725, // 100% used
        ]);

        // Create sample racks with dimensions
        $rack1 = Rack::create([
            'name' => 'Rack A',
            'shelf_id' => $shelf1->id,
            'length' => 200.0,
            'width' => 80.0,
            'number_of_shelves' => 4,
        ]);

        $rack2 = Rack::create([
            'name' => 'Rack B',
            'shelf_id' => $shelf1->id,
            'length' => 200.0,
            'width' => 80.0,
            'number_of_shelves' => 4,
        ]);

        $rack3 = Rack::create([
            'name' => 'Rack C',
            'shelf_id' => $shelf2->id,
            'length' => 200.0,
            'width' => 80.0,
            'number_of_shelves' => 4,
        ]);

        $rack4 = Rack::create([
            'name' => 'Rack D',
            'shelf_id' => $shelf3->id,
            'length' => 180.0,
            'width' => 75.0,
            'number_of_shelves' => 3,
        ]);

        $rack5 = Rack::create([
            'name' => 'Rack E',
            'shelf_id' => $shelf4->id,
            'length' => 180.0,
            'width' => 75.0,
            'number_of_shelves' => 3,
        ]);

        // Create sample columns
        $column1 = Column::create([
            'name' => 'Column 1',
            'rack_id' => $rack1->id,
        ]);

        $column2 = Column::create([
            'name' => 'Column 2',
            'rack_id' => $rack1->id,
        ]);

        $column3 = Column::create([
            'name' => 'Column 1',
            'rack_id' => $rack2->id,
        ]);

        $column4 = Column::create([
            'name' => 'Column 1',
            'rack_id' => $rack3->id,
        ]);

        $column5 = Column::create([
            'name' => 'Column 1',
            'rack_id' => $rack4->id,
        ]);

        $column6 = Column::create([
            'name' => 'Column 1',
            'rack_id' => $rack5->id,
        ]);

        // Create sample archives
        $archive1 = Archive::create([
            'title' => 'Project Documentation 2023',
            'reference_code' => 'DOC-2023-001',
            'date_archived' => '2023-12-15',
            'status' => 'active',
            'column_id' => $column1->id,
        ]);

        $archive2 = Archive::create([
            'title' => 'Financial Records Q4',
            'reference_code' => 'FIN-2023-Q4',
            'date_archived' => '2023-12-31',
            'status' => 'active',
            'column_id' => $column1->id,
        ]);

        // Create sample archive boxes
        $archiveBox1 = ArchiveBox::create([
            'name' => 'GM135',
            'document_type' => 'bon de livraison',
            'status' => 'archived',
            'archive_id' => $archive1->id,
        ]);

        $archiveBox2 = ArchiveBox::create([
            'name' => 'GM136',
            'document_type' => 'factures',
            'status' => 'active',
            'archive_id' => $archive1->id,
        ]);

        $archiveBox3 = ArchiveBox::create([
            'name' => 'GM137',
            'document_type' => 'contrats',
            'status' => 'pending',
            'archive_id' => $archive2->id,
        ]);

        $archiveBox4 = ArchiveBox::create([
            'name' => 'GM138',
            'document_type' => 'rapports',
            'status' => 'active',
            'archive_id' => $archive2->id,
        ]);

        // Create sample Document entries
        Document::create([
            'name' => 'Invoice #2024-001',
            'category' => 'Invoice',
            'year' => 2024,
            'archive_box_id' => $archiveBox1->id,
        ]);

        Document::create([
            'name' => 'Contract ABC-123',
            'category' => 'Contract',
            'year' => 2023,
            'archive_box_id' => $archiveBox1->id,
        ]);

        Document::create([
            'name' => 'Monthly Report Q1',
            'category' => 'Report',
            'year' => 2024,
            'archive_box_id' => $archiveBox2->id,
        ]);

        Document::create([
            'name' => 'Letter to Client XYZ',
            'category' => 'Letter',
            'year' => 2023,
            'archive_box_id' => $archiveBox2->id,
        ]);

        Document::create([
            'name' => 'Receipt #45678',
            'category' => 'Receipt',
            'year' => 2024,
            'archive_box_id' => $archiveBox3->id,
        ]);

        Archive::create([
            'title' => 'HR Policies',
            'reference_code' => 'HR-POL-001',
            'date_archived' => '2023-11-20',
            'status' => 'active',
            'column_id' => $column2->id,
        ]);

        Archive::create([
            'title' => 'Old Contracts',
            'reference_code' => 'CON-2022-001',
            'date_archived' => '2022-12-31',
            'status' => 'archived',
            'column_id' => $column3->id,
        ]);

        Archive::create([
            'title' => 'Technical Specifications',
            'reference_code' => 'TECH-SPEC-001',
            'date_archived' => '2023-10-15',
            'status' => 'inactive',
            'column_id' => $column4->id,
        ]);
    }
}
