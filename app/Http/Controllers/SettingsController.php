<?php

namespace App\Http\Controllers;

use App\Models\ArchiveBox;
use App\Models\Direction;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display the settings page with all tabs.
     */
    public function index()
    {
        $archiveBoxes = ArchiveBox::all();
        $directions = Direction::all();
        $rooms = Room::all();

        return Inertia::render('Settings/Index', [
            'archiveBoxes' => $archiveBoxes,
            'directions' => $directions,
            'rooms' => $rooms,
        ]);
    }

    // Archive Box Management
    public function storeBox(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'document_type' => 'required|string|max:255',
            'status' => 'required|in:active,inactive,archived',
            'archive_id' => 'required|exists:archives,id',
        ]);

        ArchiveBox::create($validated);

        return redirect()->back()->with('success', 'Archive box created successfully.');
    }

    public function updateBox(Request $request, $id)
    {
        $box = ArchiveBox::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'document_type' => 'required|string|max:255',
            'status' => 'required|in:active,inactive,archived',
            'archive_id' => 'required|exists:archives,id',
        ]);

        $box->update($validated);

        return redirect()->back()->with('success', 'Archive box updated successfully.');
    }

    public function deleteBox($id)
    {
        $box = ArchiveBox::findOrFail($id);
        $box->delete();

        return redirect()->back()->with('success', 'Archive box deleted successfully.');
    }

    // Direction Management
    public function storeDirection(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Direction::create($validated);

        return redirect()->back()->with('success', 'Direction created successfully.');
    }

    public function updateDirection(Request $request, $id)
    {
        $direction = Direction::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $direction->update($validated);

        return redirect()->back()->with('success', 'Direction updated successfully.');
    }

    public function deleteDirection($id)
    {
        $direction = Direction::findOrFail($id);
        $direction->delete();

        return redirect()->back()->with('success', 'Direction deleted successfully.');
    }

    /**
     * Display the directions management page.
     */
    public function directions()
    {
        $directions = Direction::all();

        return Inertia::render('Directions/Index', [
            'directions' => $directions,
        ]);
    }

    // Room Management
    public function storeRoom(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'capacity' => 'nullable|integer|min:1',
            'floor' => 'nullable|string|max:255',
        ]);

        Room::create($validated);

        return redirect()->back()->with('success', 'Room created successfully.');
    }

    public function updateRoom(Request $request, $id)
    {
        $room = Room::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'capacity' => 'nullable|integer|min:1',
            'floor' => 'nullable|string|max:255',
        ]);

        $room->update($validated);

        return redirect()->back()->with('success', 'Room updated successfully.');
    }

    public function deleteRoom($id)
    {
        $room = Room::findOrFail($id);
        $room->delete();

        return redirect()->back()->with('success', 'Room deleted successfully.');
    }
}
