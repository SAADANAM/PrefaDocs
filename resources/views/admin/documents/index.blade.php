@extends('layouts.admin')

@section('title', 'Documents Management')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Documents Management</h1>
        <p class="text-gray-600 mt-2">Manage and view all documents in the system</p>
    </div>

    <!-- Session Messages -->
    @if(session('success'))
        <div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {{ session('success') }}
        </div>
    @endif

    @if(session('error'))
        <div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ session('error') }}
        </div>
    @endif

    <!-- Request Status Summary for Normal Users -->
    @if(!auth()->user()->isAdmin())
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Your Document Request Status</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                @php
                    $totalRequests = auth()->user()->documentRequests->count();
                    $pendingRequests = auth()->user()->documentRequests->where('status', 'pending')->count();
                    $approvedRequests = auth()->user()->documentRequests->where('status', 'approved')->count();
                    $rejectedRequests = auth()->user()->documentRequests->where('status', 'rejected')->count();
                @endphp
                
                <div class="bg-blue-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-blue-600">{{ $totalRequests }}</div>
                    <div class="text-sm text-blue-600">Total Requests</div>
                </div>
                
                <div class="bg-yellow-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-yellow-600">{{ $pendingRequests }}</div>
                    <div class="text-sm text-yellow-600">Pending</div>
                </div>
                
                <div class="bg-green-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-green-600">{{ $approvedRequests }}</div>
                    <div class="text-sm text-green-600">Approved</div>
                </div>
                
                <div class="bg-red-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-red-600">{{ $rejectedRequests }}</div>
                    <div class="text-sm text-red-600">Rejected</div>
                </div>
            </div>
        </div>
    @endif

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
                <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Search Documents</label>
                <input type="text" id="search" name="search" placeholder="Search by name, category, or year..." 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <div class="flex-1">
                <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                <select id="category" name="category" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">All Categories</option>
                    <option value="invoice">Invoice</option>
                    <option value="contract">Contract</option>
                    <option value="report">Report</option>
                    <option value="letter">Letter</option>
                    <option value="receipt">Receipt</option>
                    <option value="form">Form</option>
                    <option value="manual">Manual</option>
                    <option value="certificate">Certificate</option>
                </select>
            </div>
            <div class="flex items-end">
                <button type="button" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition">
                    Apply Filters
                </button>
            </div>
        </div>
    </div>

    <!-- Documents Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">All Documents</h2>
        </div>
        
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Document
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Year
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Archive Box
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Owner
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Request Status
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($documents as $document)
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <div class="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                            @switch(strtolower($document->category))
                                                @case('invoice')
                                                    📄
                                                    @break
                                                @case('contract')
                                                    📋
                                                    @break
                                                @case('report')
                                                    📊
                                                    @break
                                                @case('letter')
                                                    ✉️
                                                    @break
                                                @case('receipt')
                                                    🧾
                                                    @break
                                                @case('form')
                                                    📝
                                                    @break
                                                @case('manual')
                                                    📚
                                                    @break
                                                @case('certificate')
                                                    🏆
                                                    @break
                                                @default
                                                    📄
                                            @endswitch
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ $document->name }}</div>
                                        @if($document->file_path)
                                            <div class="text-sm text-green-600">File attached</div>
                                        @else
                                            <div class="text-sm text-gray-500">No file</div>
                                        @endif
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {{ ucfirst($document->category) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ $document->year }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                @if($document->archiveBox)
                                    <div class="text-sm text-gray-900">{{ $document->archiveBox->name }}</div>
                                    <div class="text-sm text-gray-500">{{ $document->archiveBox->document_type }}</div>
                                @else
                                    <span class="text-sm text-gray-500">No box assigned</span>
                                @endif
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                @if($document->user)
                                    <div class="text-sm text-gray-900">{{ $document->user->name }}</div>
                                    <div class="text-sm text-gray-500">{{ $document->user->email }}</div>
                                @else
                                    <span class="text-sm text-gray-500">No owner</span>
                                @endif
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                                                    @if(!auth()->user()->isAdmin())
                                        @php
                                            $userRequest = $document->documentRequests->where('user_id', auth()->id())->first();
                                        @endphp
                                        
                                        @if($userRequest)
                                            @switch($userRequest->status)
                                                @case('pending')
                                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        Pending
                                                    </span>
                                                    @break
                                                @case('approved')
                                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Approved
                                                    </span>
                                                    @break
                                                @case('rejected')
                                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        Rejected
                                                    </span>
                                                    @break
                                                @default
                                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        {{ ucfirst($userRequest->status) }}
                                                    </span>
                                            @endswitch
                                        @else
                                            <span class="text-sm text-gray-500">No request</span>
                                        @endif
                                    @else
                                        <span class="text-sm text-gray-500">Admin</span>
                                    @endif
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="flex space-x-2">
                                    <a href="{{ route('documents.show', $document->id) }}" 
                                       class="text-indigo-600 hover:text-indigo-900">View</a>
                                    <a href="{{ route('documents.edit', $document->id) }}" 
                                       class="text-yellow-600 hover:text-yellow-900">Edit</a>
                                    
                                    @if(!auth()->user()->isAdmin())
                                        @if(!$userRequest)
                                            <!-- Request Document Form -->
                                            <form action="{{ route('document-requests.store') }}" method="POST" class="inline">
                                                @csrf
                                                <input type="hidden" name="document_id" value="{{ $document->id }}">
                                                <button type="submit" 
                                                        class="text-purple-600 hover:text-purple-900 bg-purple-100 hover:bg-purple-200 px-2 py-1 rounded text-xs">
                                                    Request
                                                </button>
                                            </form>
                                        @elseif($userRequest->status === 'rejected')
                                            <!-- Re-request Document Form (if rejected) -->
                                            <div class="flex flex-col space-y-1">
                                                <form action="{{ route('document-requests.store') }}" method="POST" class="inline">
                                                    @csrf
                                                    <input type="hidden" name="document_id" value="{{ $document->id }}">
                                                    <button type="submit" 
                                                            class="text-purple-600 hover:text-purple-900 bg-purple-100 hover:bg-purple-200 px-2 py-1 rounded text-xs">
                                                        Re-request
                                                    </button>
                                                </form>
                                                <span class="text-xs text-gray-500">
                                                    Rejected: {{ $userRequest->responded_at ? $userRequest->responded_at->format('M d, Y') : 'Recently' }}
                                                </span>
                                            </div>
                                        @elseif($userRequest->status === 'pending')
                                            <!-- Show pending info -->
                                            <div class="flex flex-col space-y-1">
                                                <span class="text-xs text-gray-500">
                                                    Requested: {{ $userRequest->created_at->format('M d, Y') }}
                                                </span>
                                                <span class="text-xs text-gray-400">
                                                    Waiting for admin approval
                                                </span>
                                            </div>
                                        @elseif($userRequest->status === 'approved')
                                            <!-- Show approved info -->
                                            <div class="flex flex-col space-y-1">
                                                <span class="text-xs text-gray-500">
                                                    Approved: {{ $userRequest->responded_at ? $userRequest->responded_at->format('M d, Y') : 'Recently' }}
                                                </span>
                                                <span class="text-xs text-green-600">
                                                    ✓ Access granted
                                                </span>
                                            </div>
                                        @endif
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="px-6 py-4 text-center text-gray-500">
                                <div class="text-center py-8">
                                    <span class="text-6xl mb-4 block">📄</span>
                                    <h3 class="text-lg font-medium text-gray-900">No documents found</h3>
                                    <p class="text-sm text-gray-500 mt-1">Get started by creating a new document.</p>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        
        @if($documents->hasPages())
            <div class="px-6 py-4 border-t border-gray-200">
                {{ $documents->links() }}
            </div>
        @endif
    </div>

    <!-- Action Buttons -->
    <div class="mt-6 flex justify-between items-center">
        <div class="flex space-x-3">
            <a href="{{ route('documents.create') }}" 
               class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition">
                Add New Document
            </a>
            <a href="{{ route('archive-boxes.index') }}" 
               class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                View Archive Boxes
            </a>
        </div>
        
        <div class="text-sm text-gray-500">
            Showing {{ $documents->count() }} of {{ $documents->total() }} documents
        </div>
    </div>
</div>

<script>
// Simple search functionality
document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Category filter functionality
document.getElementById('category').addEventListener('change', function() {
    const selectedCategory = this.value.toLowerCase();
    const rows = document.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        if (!selectedCategory) {
            row.style.display = '';
            return;
        }
        
        const categoryCell = row.querySelector('td:nth-child(2)');
        if (categoryCell && categoryCell.textContent.toLowerCase().includes(selectedCategory)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
</script>
@endsection
