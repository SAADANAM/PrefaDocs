<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Site;
use App\Models\Shelf;
use App\Models\Rack;
use App\Models\Column;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomManagementController extends Controller
{
    /**
     * Display a listing of rooms with rack and column counts
     */
    public function index()
    {
        $rooms = Room::with(['site', 'shelves.racks.columns'])
            ->get()
            ->map(function ($room) {
                $rackCount = $room->shelves->sum(function ($shelf) {
                    return $shelf->racks->count();
                });
                
                $columnCount = $room->shelves->sum(function ($shelf) {
                    return $shelf->racks->sum(function ($rack) {
                        return $rack->columns->count();
                    });
                });

                return [
                    'id' => $room->id,
                    'name' => $room->name,
                    'location' => $room->location,
                    'site_name' => $room->site ? $room->site->label : 'N/A',
                    'rack_count' => $rackCount,
                    'column_count' => $columnCount,
                    'number_of_racks' => $room->number_of_racks,
                ];
            });

        return Inertia::render('RoomManagement/Index', [
            'rooms' => $rooms,
        ]);
    }

    /**
     * Show the form for creating a new room
     */
    public function create()
    {
        $sites = Site::all();
        
        return Inertia::render('RoomManagement/Create', [
            'sites' => $sites,
        ]);
    }

    /**
     * Store a newly created room
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'site_id' => 'required|exists:sites,id',
            'number_of_racks' => 'required|integer|min:1',
        ]);

        $room = Room::create($validated);

        return redirect()->route('room-management.rack-config', $room->id)
            ->with('success', 'Room created successfully. Now configure the racks.');
    }

    /**
     * Show rack configuration for a room
     */
    public function rackConfig($roomId)
    {
        $room = Room::with(['site'])->findOrFail($roomId);
        
        return Inertia::render('RoomManagement/RackConfig', [
            'room' => $room,
        ]);
    }

    /**
     * Store rack configuration for a room
     */
    public function storeRackConfig(Request $request, $roomId)
    {
        $room = Room::findOrFail($roomId);
        
        $validated = $request->validate([
            'racks' => 'required|array|min:1',
            'racks.*.name' => 'required|string|max:255',
            'racks.*.length' => 'required|numeric|min:0.01',
            'racks.*.width' => 'required|numeric|min:0.01',
            'racks.*.number_of_shelves' => 'required|integer|min:1',
        ]);

        // Create shelves and racks for the room
        foreach ($validated['racks'] as $rackData) {
            // Create a shelf for each rack
            $shelf = Shelf::create([
                'name' => 'Shelf for ' . $rackData['name'],
                'location_description' => $room->location,
                'room_id' => $room->id,
                'room_name' => $room->name,
                'total_capacity' => $rackData['length'] * $rackData['width'] * $rackData['number_of_shelves'],
                'used_space' => 0,
            ]);

            // Create the rack with dimensions
            $rack = Rack::create([
                'name' => $rackData['name'],
                'shelf_id' => $shelf->id,
                'length' => $rackData['length'],
                'width' => $rackData['width'],
                'number_of_shelves' => $rackData['number_of_shelves'],
            ]);

            // Store rack info in session for shelf configuration
            session(['rack_config.' . $rack->id => [
                'name' => $rack->name,
                'number_of_shelves' => $rack->number_of_shelves,
            ]]);
        }

        return redirect()->route('room-management.shelf-config', $room->id)
            ->with('success', 'Racks configured successfully. Now configure the shelves.');
    }

    /**
     * Show shelf configuration for a room
     */
    public function shelfConfig($roomId)
    {
        $room = Room::with(['site', 'shelves.racks'])->findOrFail($roomId);
        
        return Inertia::render('RoomManagement/ShelfConfig', [
            'room' => $room,
        ]);
    }

    /**
     * Store shelf configuration for a room
     */
    public function storeShelfConfig(Request $request, $roomId)
    {
        $room = Room::with(['shelves.racks'])->findOrFail($roomId);
        
        $validated = $request->validate([
            'shelves' => 'required|array|min:1',
            'shelves.*.rack_id' => 'required|exists:racks,id',
            'shelves.*.shelf_configs' => 'required|array|min:1',
            'shelves.*.shelf_configs.*.name' => 'required|string|max:255',
            'shelves.*.shelf_configs.*.columns' => 'required|integer|min:1',
        ]);

        // Create columns for each shelf configuration
        foreach ($validated['shelves'] as $shelfData) {
            $rack = $room->shelves->flatMap->racks->firstWhere('id', $shelfData['rack_id']);
            
            if ($rack) {
                foreach ($shelfData['shelf_configs'] as $shelfConfig) {
                    // Create columns for this shelf
                    for ($i = 1; $i <= $shelfConfig['columns']; $i++) {
                        Column::create([
                            'name' => $shelfConfig['name'] . " - Column {$i}",
                            'rack_id' => $rack->id,
                        ]);
                    }
                }
            }
        }

        return redirect()->route('room-management.index')
            ->with('success', 'Room and storage structure configured successfully!');
    }
}
