<?php

namespace App\Http\Controllers;

use App\Models\Column;
use App\Models\Rack;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ColumnController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $columns = Column::with(['rack'])->withCount('archives')->get();
        
        return Inertia::render('Columns/Index', [
            'columns' => $columns,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $racks = Rack::all();
        
        return Inertia::render('Columns/Create', [
            'racks' => $racks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'rack_id' => 'required|exists:racks,id',
        ]);

        Column::create($validated);

        return redirect()->route('columns.index')
            ->with('success', 'Column created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $column = Column::with(['rack', 'archives'])->findOrFail($id);
        
        return Inertia::render('Columns/Show', [
            'column' => $column,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $column = Column::findOrFail($id);
        $racks = Rack::all();
        
        return Inertia::render('Columns/Edit', [
            'column' => $column,
            'racks' => $racks,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $column = Column::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'rack_id' => 'required|exists:racks,id',
        ]);

        $column->update($validated);

        return redirect()->route('columns.index')
            ->with('success', 'Column updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $column = Column::findOrFail($id);
        $column->delete();

        return redirect()->route('columns.index')
            ->with('success', 'Column deleted successfully.');
    }
}
