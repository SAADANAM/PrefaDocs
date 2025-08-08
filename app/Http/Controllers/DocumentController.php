<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\ArchiveBox;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $archiveBoxId = $request->query('archive_box_id');
        
        if ($archiveBoxId) {
            $documents = Document::where('archive_box_id', $archiveBoxId)
                ->with('archiveBox')
                ->get();
            $archiveBox = ArchiveBox::findOrFail($archiveBoxId);
        } else {
            $documents = Document::with('archiveBox')->get();
            $archiveBox = null;
        }
        
        return Inertia::render('Documents/Index', [
            'documents' => $documents,
            'archiveBox' => $archiveBox,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $archiveBoxId = $request->query('archive_box_id');
        $archiveBoxes = ArchiveBox::all();
        
        return Inertia::render('Documents/Create', [
            'archiveBoxes' => $archiveBoxes,
            'selectedArchiveBoxId' => $archiveBoxId,
        ]);
    }

    /**
     * Show the form for archiving a document with location selection.
     */
    public function archiveWithLocation(Request $request)
    {
        $archiveBoxId = $request->query('archive_box_id');
        $archiveBoxes = ArchiveBox::all();
        
        return Inertia::render('Documents/ArchiveWithLocation', [
            'document' => null,
            'archiveBoxes' => $archiveBoxes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'archive_box_id' => 'required|exists:archive_boxes,id',
            'shelf_id' => 'nullable|exists:shelves,id',
            'rack_id' => 'nullable|exists:racks,id',
            'column_id' => 'nullable|exists:columns,id',
        ]);

        Document::create($validated);

        return redirect()->route('documents.index', ['archive_box_id' => $validated['archive_box_id']])
            ->with('success', 'Document created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $document = Document::with('archiveBox')->findOrFail($id);
        
        return Inertia::render('Documents/Show', [
            'document' => $document,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $document = Document::findOrFail($id);
        $archiveBoxes = ArchiveBox::all();
        
        return Inertia::render('Documents/Edit', [
            'document' => $document,
            'archiveBoxes' => $archiveBoxes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $document = Document::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'archive_box_id' => 'required|exists:archive_boxes,id',
        ]);

        $document->update($validated);

        return redirect()->route('documents.index', ['archive_box_id' => $validated['archive_box_id']])
            ->with('success', 'Document updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $document = Document::findOrFail($id);
        $archiveBoxId = $document->archive_box_id;
        $document->delete();

        return redirect()->route('documents.index', ['archive_box_id' => $archiveBoxId])
            ->with('success', 'Document deleted successfully.');
    }
}
