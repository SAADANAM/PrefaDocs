import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, document }) {
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Document Details</h2>}
        >
            <Head title={`Document - ${document.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header with Back button */}
                            <div className="flex justify-between items-center mb-6">
                                <Link
                                    href={route('documents.index', { archive_box_id: document.archive_box_id })}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    ← Back to Documents
                                </Link>
                                <div className="flex gap-2">
                                    <Link
                                        href={route('documents.edit', document.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Edit Document
                                    </Link>
                                </div>
                            </div>

                            {/* Document Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - Document Info */}
                                <div>
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex items-center mb-4">
                                            <span className="text-6xl mr-4">
                                                {getDocumentIcon(document.category)}
                                            </span>
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900">{document.name}</h1>
                                                <p className="text-gray-600">{document.category}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <p className="text-gray-900 mt-1">{document.category}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Year</label>
                                                <p className="text-gray-900 mt-1">{document.year}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Created</label>
                                                <p className="text-gray-900 mt-1">{new Date(document.created_at).toLocaleDateString()}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                                                <p className="text-gray-900 mt-1">{new Date(document.updated_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* File Information */}
                                    <div className="bg-white rounded-lg p-6 mt-6 border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">File Information</h3>
                                        
                                        {document.file_path ? (
                                            <div className="space-y-4">
                                                <div className="flex items-center p-3 bg-green-50 rounded-md border border-green-200">
                                                    <svg className="h-5 w-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                    </svg>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-green-800">File Attached</p>
                                                        <p className="text-xs text-green-600 mt-1">
                                                            {document.file_path.split('/').pop()}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-3">
                                                    <Link
                                                        href={route('documents.download', document.id)}
                                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center font-medium py-2 px-4 rounded transition"
                                                    >
                                                        Download File
                                                    </Link>
                                                    <Link
                                                        href={route('documents.edit', document.id)}
                                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 px-4 rounded transition"
                                                    >
                                                        Replace File
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                                <p className="text-gray-500 mb-4">No file has been uploaded for this document.</p>
                                                <Link
                                                    href={route('documents.edit', document.id)}
                                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition"
                                                >
                                                    Upload File
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column - Archive Box Info */}
                                <div>
                                    <div className="bg-blue-50 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Archive Box Information</h3>
                                        
                                        {document.archiveBox ? (
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Box Name</label>
                                                    <p className="text-gray-900 mt-1 font-medium">{document.archiveBox.name}</p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Document Type</label>
                                                    <p className="text-gray-900 mt-1">{document.archiveBox.document_type}</p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                                                        document.archiveBox.status === 'active' ? 'bg-green-100 text-green-800' :
                                                        document.archiveBox.status === 'archived' ? 'bg-blue-100 text-blue-800' :
                                                        document.archiveBox.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {document.archiveBox.status}
                                                    </span>
                                                </div>

                                                <div className="pt-4">
                                                    <Link
                                                        href={route('archive-boxes.show', document.archiveBox.id)}
                                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                                    >
                                                        View Archive Box →
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No archive box associated with this document.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Actions */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                                <div className="flex gap-4">
                                    <Link
                                        href={route('documents.edit', document.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Edit Document
                                    </Link>
                                    <Link
                                        href={route('documents.index', { archive_box_id: document.archive_box_id })}
                                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Back to List
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 