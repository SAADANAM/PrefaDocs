<?php

namespace App\Http\Controllers;

use App\Models\Rack;
use App\Models\Shelf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $racks = Rack::with(['shelf'])->withCount('columns')->get();
        
        return Inertia::render('Racks/Index', [
            'racks' => $racks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $shelves = Shelf::all();
        
        return Inertia::render('Racks/Create', [
            'shelves' => $shelves,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'shelf_id' => 'required|exists:shelves,id',
        ]);

        Rack::create($validated);

        return redirect()->route('racks.index')
            ->with('success', 'Rack created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rack = Rack::with(['shelf', 'columns' => function($query) {
            $query->withCount('archives');
        }])->findOrFail($id);
        
        return Inertia::render('Racks/Show', [
            'rack' => $rack,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $rack = Rack::findOrFail($id);
        $shelves = Shelf::all();
        
        return Inertia::render('Racks/Edit', [
            'rack' => $rack,
            'shelves' => $shelves,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $rack = Rack::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'shelf_id' => 'required|exists:shelves,id',
        ]);

        $rack->update($validated);

        return redirect()->route('racks.index')
            ->with('success', 'Rack updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rack = Rack::findOrFail($id);
        $rack->delete();

        return redirect()->route('racks.index')
            ->with('success', 'Rack deleted successfully.');
    }
}
