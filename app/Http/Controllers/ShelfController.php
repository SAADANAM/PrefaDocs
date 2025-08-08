<?php

namespace App\Http\Controllers;

use App\Models\Shelf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShelfController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shelves = Shelf::withCount('racks')->get();
        
        return Inertia::render('Shelves/Index', [
            'shelves' => $shelves,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Shelves/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location_description' => 'nullable|string',
        ]);

        Shelf::create($validated);

        return redirect()->route('shelves.index')
            ->with('success', 'Shelf created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $shelf = Shelf::with(['racks' => function($query) {
            $query->withCount('columns');
        }])->findOrFail($id);
        
        return Inertia::render('Shelves/Show', [
            'shelf' => $shelf,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $shelf = Shelf::findOrFail($id);
        
        return Inertia::render('Shelves/Edit', [
            'shelf' => $shelf,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $shelf = Shelf::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location_description' => 'nullable|string',
        ]);

        $shelf->update($validated);

        return redirect()->route('shelves.index')
            ->with('success', 'Shelf updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $shelf = Shelf::findOrFail($id);
        $shelf->delete();

        return redirect()->route('shelves.index')
            ->with('success', 'Shelf deleted successfully.');
    }

    /**
     * Get shelves for location selection.
     */
    public function getForLocationSelection()
    {
        $shelves = Shelf::select('id', 'name', 'room_id', 'room_name', 'shelf_dimensions', 'depth')
            ->with(['racks' => function($query) {
                $query->select('id', 'name', 'shelf_id')
                    ->with(['columns' => function($query) {
                        $query->select('id', 'name', 'rack_id');
                    }]);
            }])
            ->get();
        
        return response()->json($shelves);
    }
}
