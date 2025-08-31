import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ documents, archiveBox, userDocumentRequests }) {
    const page = usePage();
    const { auth, flash } = page.props;
    
    const getDocumentIcon = (category) => {
        const icons = {
            'invoice': '📄',
            'contract': '📋',
            'report': '📊',
            'letter': '✉️',
            'receipt': '🧾',
            'form': '📝',
            'manual': '📚',
            'certificate': '🏆',
            'default': '📄'
        };
        return icons[category.toLowerCase()] || icons.default;
    };

    const handleRequestDocument = (documentId) => {
        router.post(route('document-requests.store'), {
            document_id: documentId
        });
    };

    // Get user's request for a specific document
    const getUserRequest = (documentId) => {
        return userDocumentRequests?.[documentId] || null;
    };

    // Check if user has a pending request for a document
    const hasPendingRequest = (documentId) => {
        const userRequest = getUserRequest(documentId);
        return userRequest && userRequest.status === 'pending';
    };

    // Check if user can request a document
    const canRequestDocument = (documentId) => {
        const userRequest = getUserRequest(documentId);
        return !userRequest || userRequest.status === 'rejected';
    };

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Documents</h2>}
        >
            <Head title="Documents" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Session Messages */}
                            {flash?.success && (
                                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                    {flash.success}
                                </div>
                            )}
                            
                            {flash?.error && (
                                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    {flash.error}
                                </div>
                            )}

                            {/* Request Status Summary for Normal Users */}
                            {auth?.user?.role === 'user' && userDocumentRequests && (
                                <div className="mb-6 bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Your Document Request Status</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">{Object.keys(userDocumentRequests).length}</div>
                                            <div className="text-sm text-blue-600">Total Requests</div>
                                        </div>
                                        
                                        <div className="bg-yellow-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-yellow-600">
                                                {Object.values(userDocumentRequests).filter(req => req.status === 'pending').length}
                                            </div>
                                            <div className="text-sm text-yellow-600">Pending</div>
                                        </div>
                                        
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">
                                                {Object.values(userDocumentRequests).filter(req => req.status === 'approved').length}
                                            </div>
                                            <div className="text-sm text-green-600">Approved</div>
                                        </div>
                                        
                                        <div className="bg-red-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-red-600">
                                                {Object.values(userDocumentRequests).filter(req => req.status === 'rejected').length}
                                            </div>
                                            <div className="text-sm text-red-600">Rejected</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Header with Add Document button and Box info */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {archiveBox ? `Documents in ${archiveBox.name}` : 'All Documents'}
                                    </h3>
                                    {archiveBox && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            {archiveBox.document_type} • {archiveBox.status}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={route('documents.create', { archive_box_id: archiveBox?.id })}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Add Document
                                    </Link>
                                    <Link
                                        href={route('documents.archive-with-location', { archive_box_id: archiveBox?.id })}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Archive with Location
                                    </Link>
                                </div>
                            </div>

                            {/* Documents Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {documents.map((document) => (
                                    <div key={document.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        {/* Document Icon */}
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-center justify-center h-16">
                                                <span className="text-4xl">
                                                    {getDocumentIcon(document.category)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Document Info */}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{document.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{document.category}</p>
                                            <p className="text-sm text-gray-500 mb-3">{document.year}</p>
                                            
                                            {/* Document Owner */}
                                            {document.user && (
                                                <p className="text-xs text-gray-400 mb-3">
                                                    Owner: {document.user.name}
                                                </p>
                                            )}
                                            
                                            {/* File Status */}
                                            <div className="mb-4">
                                                {document.file_path ? (
                                                    <div className="flex items-center justify-between p-2 bg-green-50 rounded-md border border-green-200">
                                                        <div className="flex items-center">
                                                            <svg className="h-4 w-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                            </svg>
                                                            <span className="text-xs text-green-700 font-medium">File attached</span>
                                                        </div>
                                                        <Link
                                                            href={route('documents.download', document.id)}
                                                            className="text-green-600 hover:text-green-800 text-xs font-medium"
                                                        >
                                                            Download
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center p-2 bg-gray-50 rounded-md border border-gray-200">
                                                        <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                        </svg>
                                                        <span className="text-xs text-gray-500">No file uploaded</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Action Buttons */}
                                            <div className="flex gap-2 mb-2">
                                                <Link
                                                    href={route('documents.show', document.id)}
                                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded text-center transition"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('documents.edit', document.id)}
                                                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-3 rounded text-center transition"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                            
                                            {/* Request Document Button - Only for regular users */}
                                            {auth?.user?.role === 'user' && (
                                                <div className="mt-2">
                                                    {(() => {
                                                        const userRequest = getUserRequest(document.id);
                                                        
                                                        if (userRequest) {
                                                            // User has a request - show status
                                                            switch (userRequest.status) {
                                                                case 'pending':
                                                                    return (
                                                                        <div className="text-center">
                                                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                                Pending
                                                                            </span>
                                                                            <div className="text-xs text-gray-500 mt-1">
                                                                                Requested: {new Date(userRequest.created_at).toLocaleDateString()}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                case 'approved':
                                                                    return (
                                                                        <div className="text-center">
                                                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                                Approved
                                                                            </span>
                                                                            <div className="text-xs text-green-600 mt-1">
                                                                                ✓ Access granted
                                                                            </div>
                                                                            {userRequest.responded_at && (
                                                                                <div className="text-xs text-gray-500 mt-1">
                                                                                    {new Date(userRequest.responded_at).toLocaleDateString()}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                case 'rejected':
                                                                    return (
                                                                        <div className="text-center">
                                                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                                                Rejected
                                                                            </span>
                                                                            <div className="text-xs text-gray-500 mt-1">
                                                                                {userRequest.responded_at && `Rejected: ${new Date(userRequest.responded_at).toLocaleDateString()}`}
                                                                            </div>
                                                                            <button
                                                                                onClick={() => handleRequestDocument(document.id)}
                                                                                className="mt-2 w-full bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium py-1.5 px-3 rounded transition"
                                                                            >
                                                                                Re-request
                                                                            </button>
                                                                        </div>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                                            {userRequest.status}
                                                                        </span>
                                                                    );
                                                            }
                                                        } else {
                                                            // No request - show request button
                                                            return (
                                                                <button
                                                                    onClick={() => handleRequestDocument(document.id)}
                                                                    className="w-full bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium py-2 px-3 rounded transition"
                                                                >
                                                                    Request Document
                                                                </button>
                                                            );
                                                        }
                                                    })()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Empty State */}
                            {documents.length === 0 && (
                                <div className="text-center py-12">
                                    <span className="text-6xl mb-4 block">📄</span>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {archiveBox 
                                            ? `Get started by adding documents to ${archiveBox.name}.`
                                            : 'Get started by creating a new document.'
                                        }
                                    </p>
                                    <div className="mt-6">
                                        <Link
                                            href={route('documents.create', { archive_box_id: archiveBox?.id })}
                                            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
                                        >
                                            Add Document
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Back to Archive Boxes */}
                            {archiveBox && (
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <Link
                                        href={route('archive-boxes.show', archiveBox.id)}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        ← Back to Archive Box
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 