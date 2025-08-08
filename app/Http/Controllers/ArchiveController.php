<?php

namespace App\Http\Controllers;

use App\Models\Archive;
use App\Models\Column;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArchiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $archives = Archive::with(['column.rack.shelf'])->get();
        
        return Inertia::render('Archives/Index', [
            'archives' => $archives,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $columns = Column::with(['rack.shelf'])->get();
        
        return Inertia::render('Archives/Create', [
            'columns' => $columns,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'reference_code' => 'required|string|unique:archives,reference_code',
            'date_archived' => 'required|date',
            'status' => 'required|in:active,inactive,archived',
            'column_id' => 'required|exists:columns,id',
        ]);

        Archive::create($validated);

        return redirect()->route('archives.index')
            ->with('success', 'Archive created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $archive = Archive::with(['column.rack.shelf'])->findOrFail($id);
        
        return Inertia::render('Archives/Show', [
            'archive' => $archive,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $archive = Archive::findOrFail($id);
        $columns = Column::with(['rack.shelf'])->get();
        
        return Inertia::render('Archives/Edit', [
            'archive' => $archive,
            'columns' => $columns,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $archive = Archive::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'reference_code' => 'required|string|unique:archives,reference_code,' . $id,
            'date_archived' => 'required|date',
            'status' => 'required|in:active,inactive,archived',
            'column_id' => 'required|exists:columns,id',
        ]);

        $archive->update($validated);

        return redirect()->route('archives.index')
            ->with('success', 'Archive updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $archive = Archive::findOrFail($id);
        $archive->delete();

        return redirect()->route('archives.index')
            ->with('success', 'Archive deleted successfully.');
    }
}
