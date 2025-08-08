import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, column }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Column Details</h2>}
        >
            <Head title={`Column - ${column.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header with Back button */}
                            <div className="flex justify-between items-center mb-6">
                                <Link
                                    href={route('columns.index')}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    ← Back to Columns
                                </Link>
                                <div className="flex gap-2">
                                    <Link
                                        href={route('columns.edit', column.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Edit Column
                                    </Link>
                                </div>
                            </div>

                            {/* Column Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - Column Info */}
                                <div>
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex items-center mb-4">
                                            <svg className="w-12 h-12 text-purple-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900">{column.name}</h1>
                                                <p className="text-gray-600">Column</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Rack</label>
                                                <p className="text-gray-900 mt-1">{column.rack ? column.rack.name : 'No rack assigned'}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Created</label>
                                                <p className="text-gray-900 mt-1">{new Date(column.created_at).toLocaleDateString()}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                                                <p className="text-gray-900 mt-1">{new Date(column.updated_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Archives */}
                                <div>
                                    <div className="bg-purple-50 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Archives in this Column</h3>
                                        
                                        {column.archives && column.archives.length > 0 ? (
                                            <div className="space-y-3">
                                                {column.archives.map((archive) => (
                                                    <div key={archive.id} className="bg-white rounded-lg p-4 border border-purple-200">
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <h4 className="font-medium text-gray-900">{archive.title}</h4>
                                                                <p className="text-sm text-gray-600">{archive.reference_code}</p>
                                                                <p className="text-sm text-gray-500">{archive.status}</p>
                                                            </div>
                                                            <Link
                                                                href={route('archives.show', archive.id)}
                                                                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                                            >
                                                                View →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No archives in this column.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Actions */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                                <div className="flex gap-4">
                                    <Link
                                        href={route('columns.edit', column.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Edit Column
                                    </Link>
                                    <Link
                                        href={route('columns.index')}
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