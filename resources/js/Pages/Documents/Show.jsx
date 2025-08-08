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