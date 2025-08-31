<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DocumentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DocumentRequestController extends Controller
{
    /**
     * Display a listing of document requests (admin only)
     */
    public function index()
    {
        // Check if user is admin
        if (!Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }

        try {
            $documentRequests = DocumentRequest::with(['user', 'document'])
                ->orderBy('created_at', 'desc')
                ->paginate(20);

            return view('admin.document_requests.index', [
                'documentRequests' => $documentRequests,
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('DocumentRequestController index error: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            
            abort(500, 'An error occurred while loading document requests: ' . $e->getMessage());
        }
    }

    /**
     * Store a newly created document request
     */
    public function store(Request $request)
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            abort(403, 'Unauthorized access.');
        }

        // Validate the request
        $validated = $request->validate([
            'document_id' => 'required|exists:documents,id',
        ]);

        // Check if user already has a pending request for this document
        $existingRequest = DocumentRequest::where('user_id', Auth::id())
            ->where('document_id', $validated['document_id'])
            ->where('status', 'pending')
            ->first();

        if ($existingRequest) {
            return back()->with('error', 'You already have a pending request for this document.');
        }

        // Check if document exists and is accessible
        $document = \App\Models\Document::find($validated['document_id']);
        if (!$document) {
            return back()->with('error', 'Document not found.');
        }

        // Create the document request using Eloquent
        DocumentRequest::create([
            'user_id' => Auth::id(),
            'document_id' => $validated['document_id'],
            'status' => 'pending',
            'requested_at' => now(),
        ]);

        return back()->with('success', 'Document request submitted successfully.');
    }

    /**
     * Approve a document request (admin only)
     */
    public function approve($id)
    {
        // Check if user is admin
        if (!Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }

        $documentRequest = DocumentRequest::findOrFail($id);

        // Check if request is already processed
        if ($documentRequest->status !== 'pending') {
            return back()->with('error', 'This request has already been processed.');
        }

        $documentRequest->update([
            'status' => 'approved',
            'responded_at' => now(),
        ]);

        return back()->with('success', 'Document request approved successfully.');
    }

    /**
     * Reject a document request (admin only)
     */
    public function reject($id)
    {
        // Check if user is admin
        if (!Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized access.');
        }

        $documentRequest = DocumentRequest::findOrFail($id);

        // Check if request is already processed
        if ($documentRequest->status !== 'pending') {
            return back()->with('error', 'This request has already been processed.');
        }

        $documentRequest->update([
            'status' => 'rejected',
            'responded_at' => now(),
        ]);

        return back()->with('success', 'Document request rejected successfully.');
    }
}
