import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, archiveBox }) {
    const getStatusColor = (status) => {
        return {
            'active': 'bg-green-100 text-green-800',
            'archived': 'bg-blue-100 text-blue-800',
            'pending': 'bg-yellow-100 text-yellow-800',
            'disposed': 'bg-red-100 text-red-800',
        }[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Archive Box Details</h2>}
        >
            <Head title={`Archive Box - ${archiveBox.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header with Back button */}
                            <div className="flex justify-between items-center mb-6">
                                <Link
                                    href={route('archive-boxes.index')}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    ← Back to Archive Boxes
                                </Link>
                                <div className="flex gap-2">
                                    <Link
                                        href={route('archive-boxes.edit', archiveBox.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Edit Box
                                    </Link>
                                </div>
                            </div>

                            {/* Box Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - Box Info */}
                                <div>
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex items-center mb-4">
                                            <svg className="w-12 h-12 text-yellow-500 mr-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                                            </svg>
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900">{archiveBox.name}</h1>
                                                <p className="text-gray-600">{archiveBox.document_type}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-1 ${getStatusColor(archiveBox.status)}`}>
                                                    {archiveBox.status}
                                                </span>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Created</label>
                                                <p className="text-gray-900 mt-1">{new Date(archiveBox.created_at).toLocaleDateString()}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                                                <p className="text-gray-900 mt-1">{new Date(archiveBox.updated_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Archive Info */}
                                <div>
                                    <div className="bg-blue-50 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Associated Archive</h3>
                                        
                                        {archiveBox.archive ? (
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Archive Title</label>
                                                    <p className="text-gray-900 mt-1 font-medium">{archiveBox.archive.title}</p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Reference Code</label>
                                                    <p className="text-gray-900 mt-1">{archiveBox.archive.reference_code}</p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Date Archived</label>
                                                    <p className="text-gray-900 mt-1">{new Date(archiveBox.archive.date_archived).toLocaleDateString()}</p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Archive Status</label>
                                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(archiveBox.archive.status)}`}>
                                                        {archiveBox.archive.status}
                                                    </span>
                                                </div>

                                                <div className="pt-4">
                                                    <Link
                                                        href={route('archives.show', archiveBox.archive.id)}
                                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                                    >
                                                        View Archive Details →
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No archive associated with this box.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Actions */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                                <div className="flex gap-4">
                                    <Link
                                        href={route('documents.index', { archive_box_id: archiveBox.id })}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        View Documents
                                    </Link>
                                    <Link
                                        href={route('archive-boxes.edit', archiveBox.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Edit Box
                                    </Link>
                                    <Link
                                        href={route('archive-boxes.index')}
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