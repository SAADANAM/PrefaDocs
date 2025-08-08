<?php

namespace App\Http\Controllers;

use App\Models\ArchiveBox;
use App\Models\Archive;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArchiveBoxController extends Controller
{
    public function index(Request $request)
    {
        $query = ArchiveBox::with('archive');
        
        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('document_type', 'like', "%{$search}%")
                  ->orWhere('status', 'like', "%{$search}%");
            });
        }
        
        $archiveBoxes = $query->orderBy('created_at', 'desc')->get();
        $archives = Archive::all(); // For dropdown in create/edit forms
        
        return Inertia::render('ArchiveBoxes/Index', [
            'archiveBoxes' => $archiveBoxes,
            'archives' => $archives,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $archives = Archive::all();
        
        return Inertia::render('ArchiveBoxes/Create', [
            'archives' => $archives,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'document_type' => 'required|string|max:255',
            'status' => 'required|in:active,archived,pending,disposed',
            'archive_id' => 'required|exists:archives,id',
        ]);

        ArchiveBox::create($request->all());

        return redirect()->route('archive-boxes.index')
            ->with('success', 'Archive box created successfully.');
    }

    public function show(ArchiveBox $archiveBox)
    {
        $archiveBox->load('archive');
        
        return Inertia::render('ArchiveBoxes/Show', [
            'archiveBox' => $archiveBox,
        ]);
    }

    public function edit(ArchiveBox $archiveBox)
    {
        $archives = Archive::all();
        
        return Inertia::render('ArchiveBoxes/Edit', [
            'archiveBox' => $archiveBox,
            'archives' => $archives,
        ]);
    }

    public function update(Request $request, ArchiveBox $archiveBox)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'document_type' => 'required|string|max:255',
            'status' => 'required|in:active,archived,pending,disposed',
            'archive_id' => 'required|exists:archives,id',
        ]);

        $archiveBox->update($request->all());

        return redirect()->route('archive-boxes.index')
            ->with('success', 'Archive box updated successfully.');
    }

    public function destroy(ArchiveBox $archiveBox)
    {
        $archiveBox->delete();

        return redirect()->route('archive-boxes.index')
            ->with('success', 'Archive box deleted successfully.');
    }
}
