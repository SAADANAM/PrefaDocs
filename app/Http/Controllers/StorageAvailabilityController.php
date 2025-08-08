<?php

namespace App\Http\Controllers;

use App\Models\Shelf;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StorageAvailabilityController extends Controller
{
    /**
     * Display storage availability with filtering and sorting
     */
    public function index(Request $request)
    {
        $query = Shelf::with(['room', 'racks']);

        // Apply filters
        if ($request->filled('room_filter')) {
            $query->whereHas('room', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->room_filter . '%');
            });
        }

        if ($request->filled('rack_filter')) {
            $query->whereHas('racks', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->rack_filter . '%');
            });
        }

        // Note: Availability filtering will be handled after data retrieval for SQLite compatibility

        // Apply sorting
        $sortBy = $request->get('sort_by', 'availability_percentage');
        $sortOrder = $request->get('sort_order', 'desc');

        switch ($sortBy) {
            case 'room':
                $query->join('rooms', 'shelves.room_id', '=', 'rooms.id')
                      ->orderBy('rooms.name', $sortOrder)
                      ->select('shelves.*');
                break;
            case 'rack':
                $query->join('racks', 'shelves.id', '=', 'racks.shelf_id')
                      ->orderBy('racks.name', $sortOrder)
                      ->select('shelves.*')
                      ->distinct();
                break;
            case 'shelf':
                $query->orderBy('shelves.name', $sortOrder);
                break;
            case 'dimensions':
                $query->orderBy('shelves.shelf_dimensions', $sortOrder);
                break;
            case 'free_space':
                $query->orderByRaw('(total_capacity - used_space)', $sortOrder);
                break;
            case 'availability_percentage':
            default:
                // For SQLite compatibility, we'll sort after getting the data
                break;
        }

        $shelves = $query->get()->map(function ($shelf) {
            return [
                'id' => $shelf->id,
                'room_name' => $shelf->room->name ?? 'N/A',
                'rack_name' => $shelf->racks->first()->name ?? 'N/A',
                'shelf_name' => $shelf->name,
                'dimensions' => $shelf->shelf_dimensions ?: 'N/A',
                'length_width' => $shelf->racks->first() ? 
                    ($shelf->racks->first()->length . ' × ' . $shelf->racks->first()->width . ' cm') : 'N/A',
                'total_capacity' => $shelf->total_capacity,
                'used_space' => $shelf->used_space,
                'free_space' => $shelf->free_space,
                'availability_percentage' => $shelf->availability_percentage,
                'availability_status' => $shelf->availability_status,
                'has_available_space' => $shelf->hasAvailableSpace(),
            ];
        });

        // Handle availability filtering in PHP for SQLite compatibility
        if ($request->filled('availability_filter')) {
            $availability = $request->availability_filter;
            $shelves = $shelves->filter(function ($shelf) use ($availability) {
                $percentage = $shelf['availability_percentage'];
                switch ($availability) {
                    case 'excellent':
                        return $percentage >= 80;
                    case 'good':
                        return $percentage >= 60 && $percentage < 80;
                    case 'moderate':
                        return $percentage >= 40 && $percentage < 60;
                    case 'limited':
                        return $percentage >= 20 && $percentage < 40;
                    case 'full':
                        return $percentage < 20;
                    default:
                        return true;
                }
            });
        }

        if ($request->filled('min_availability')) {
            $minAvailability = $request->min_availability;
            $shelves = $shelves->filter(function ($shelf) use ($minAvailability) {
                return $shelf['availability_percentage'] >= $minAvailability;
            });
        }

        // Handle availability_percentage sorting in PHP for SQLite compatibility
        if ($sortBy === 'availability_percentage' || $sortBy === 'default') {
            $shelves = $shelves->sortBy('availability_percentage', SORT_NUMERIC, $sortOrder === 'desc');
        }

        // Get filter options
        $rooms = Room::distinct()->pluck('name')->sort()->values();
        $racks = \App\Models\Rack::with('shelf.room')
            ->get()
            ->map(function ($rack) {
                return $rack->name . ' (' . ($rack->shelf->room->name ?? 'N/A') . ')';
            })
            ->sort()
            ->values();

        return Inertia::render('StorageAvailability/Index', [
            'shelves' => $shelves->values()->all(), // Convert to array after all operations
            'rooms' => $rooms,
            'racks' => $racks,
            'filters' => [
                'room_filter' => $request->room_filter,
                'rack_filter' => $request->rack_filter,
                'availability_filter' => $request->availability_filter,
                'min_availability' => $request->min_availability,
            ],
            'sort' => [
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    /**
     * Update shelf capacity and used space
     */
    public function updateCapacity(Request $request, $shelfId)
    {
        $validated = $request->validate([
            'total_capacity' => 'required|numeric|min:0',
            'used_space' => 'required|numeric|min:0',
        ]);

        $shelf = Shelf::findOrFail($shelfId);
        $shelf->update($validated);

        return redirect()->back()->with('success', 'Shelf capacity updated successfully.');
    }
}
