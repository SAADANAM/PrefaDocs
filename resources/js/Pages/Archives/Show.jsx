import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ArchiveShow({ archive }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-yellow-100 text-yellow-800';
            case 'archived': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Archive Details
                </h2>
            }
        >
            <Head title="Archive Details" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <Link
                            href={route('archives.index')}
                            className="text-blue-600 hover:text-blue-900"
                        >
                            ← Back to Archives
                        </Link>
                        <div className="flex space-x-2">
                            <Link
                                href={route('archives.edit', archive.id)}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Edit Archive
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Archive Information
                                    </h3>
                                    
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Title</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{archive.title}</dd>
                                        </div>
                                        
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Reference Code</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{archive.reference_code}</dd>
                                        </div>
                                        
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Date Archived</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(archive.date_archived).toLocaleDateString()}
                                            </dd>
                                        </div>
                                        
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="mt-1">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(archive.status)}`}>
                                                    {archive.status}
                                                </span>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Location Information
                                    </h3>
                                    
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Shelf</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                📚 {archive.column?.rack?.shelf?.name}
                                            </dd>
                                        </div>
                                        
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Rack</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                🗄️ {archive.column?.rack?.name}
                                            </dd>
                                        </div>
                                        
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Column</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                📦 {archive.column?.name}
                                            </dd>
                                        </div>
                                        
                                        {archive.column?.rack?.shelf?.location_description && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Location Description</dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {archive.column.rack.shelf.location_description}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Full Location Path
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                                        <span className="font-medium">📚 {archive.column?.rack?.shelf?.name}</span>
                                        <span>→</span>
                                        <span className="font-medium">🗄️ {archive.column?.rack?.name}</span>
                                        <span>→</span>
                                        <span className="font-medium">📦 {archive.column?.name}</span>
                                        <span>→</span>
                                        <span className="font-medium">📄 {archive.title}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}