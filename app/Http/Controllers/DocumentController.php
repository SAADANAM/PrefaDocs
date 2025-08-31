<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\ArchiveBox;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
                ->with(['archiveBox', 'user', 'documentRequests'])
                ->get();
            $archiveBox = ArchiveBox::findOrFail($archiveBoxId);
        } else {
            $documents = Document::with(['archiveBox', 'user', 'documentRequests'])->get();
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
            'document_file' => 'nullable|file|mimes:pdf,doc,docx|max:10240', // 10MB max
        ]);

        $filePath = null;
        
        // Handle file upload
        if ($request->hasFile('document_file')) {
            $file = $request->file('document_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('public/documents', $fileName);
        }

        // Create document with file path and user_id
        $documentData = array_filter($validated, function($key) {
            return $key !== 'document_file';
        }, ARRAY_FILTER_USE_KEY);
        
        $documentData['file_path'] = $filePath;
        $documentData['user_id'] = auth()->id();
        
        Document::create($documentData);

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
            'document_file' => 'nullable|file|mimes:pdf,doc,docx|max:10240', // 10MB max
        ]);

        $filePath = $document->file_path;
        
        // Handle file upload
        if ($request->hasFile('document_file')) {
            // Delete old file if exists
            if ($document->hasFile()) {
                Storage::delete($document->file_path);
            }
            
            $file = $request->file('document_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('public/documents', $fileName);
        }

        // Update document data (preserve existing user_id)
        $documentData = array_filter($validated, function($key) {
            return $key !== 'document_file';
        }, ARRAY_FILTER_USE_KEY);
        
        $documentData['file_path'] = $filePath;
        // user_id is not included in update to preserve the original owner
        
        $document->update($documentData);

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
        
        // File will be automatically deleted via model boot method
        $document->delete();

        return redirect()->route('documents.index', ['archive_box_id' => $archiveBoxId])
            ->with('success', 'Document deleted successfully.');
    }

    /**
     * Download the document file
     */
    public function download(string $id)
    {
        $document = Document::findOrFail($id);
        
        if (!$document->hasFile()) {
            abort(404, 'No file found for this document.');
        }
        
        if (!Storage::exists($document->file_path)) {
            abort(404, 'File not found on server.');
        }
        
        return Storage::download($document->file_path, $document->getFileName());
    }
}
