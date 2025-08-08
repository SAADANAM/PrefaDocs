import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ shelves, user }) {
    const [expandedShelves, setExpandedShelves] = useState(new Set());

    const toggleShelf = (shelfId) => {
        const newExpanded = new Set(expandedShelves);
        if (newExpanded.has(shelfId)) {
            newExpanded.delete(shelfId);
        } else {
            newExpanded.add(shelfId);
        }
        setExpandedShelves(newExpanded);
    };

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
                    Archive Management Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Quick Actions */}
                    <div className="mb-6 flex gap-4">
                        <Link
                            href={route('archives.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Add Archive
                        </Link>
                        {user.isAdmin && (
                            <>
                                <Link
                                    href={route('shelves.create')}
                                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Add Shelf
                                </Link>
                                <Link
                                    href={route('racks.create')}
                                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Add Rack
                                </Link>
                                <Link
                                    href={route('columns.create')}
                                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Add Column
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Storage Structure */}
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Storage Structure
                            </h3>
                            
                            {shelves.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No shelves found. {user.isAdmin && 'Create your first shelf to get started.'}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {shelves.map((shelf) => (
                                        <div key={shelf.id} className="border border-gray-200 rounded-lg">
                                            <div 
                                                className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                                                onClick={() => toggleShelf(shelf.id)}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg font-medium text-gray-900">
                                                        📚 {shelf.name}
                                                    </span>
                                                    {shelf.location_description && (
                                                        <span className="text-sm text-gray-500">
                                                            ({shelf.location_description})
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-gray-500">
                                                        {shelf.racks.length} racks
                                                    </span>
                                                    <svg 
                                                        className={`w-5 h-5 text-gray-500 transition-transform ${expandedShelves.has(shelf.id) ? 'rotate-180' : ''}`}
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            
                                            {expandedShelves.has(shelf.id) && (
                                                <div className="p-4 border-t border-gray-200">
                                                    {shelf.racks.length === 0 ? (
                                                        <div className="text-gray-500 text-sm">No racks in this shelf</div>
                                                    ) : (
                                                        <div className="space-y-3">
                                                            {shelf.racks.map((rack) => (
                                                                <div key={rack.id} className="ml-4 border-l-2 border-blue-200 pl-4">
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="font-medium text-gray-800">
                                                                            🗄️ {rack.name}
                                                                        </span>
                                                                        <span className="text-sm text-gray-500">
                                                                            {rack.columns.length} columns
                                                                        </span>
                                                                    </div>
                                                                    
                                                                    {rack.columns.length > 0 && (
                                                                        <div className="mt-2 space-y-2">
                                                                            {rack.columns.map((column) => (
                                                                                <div key={column.id} className="ml-4 border-l-2 border-green-200 pl-4">
                                                                                    <div className="flex items-center justify-between">
                                                                                        <span className="font-medium text-gray-700">
                                                                                            📦 {column.name}
                                                                                        </span>
                                                                                        <span className="text-sm text-gray-500">
                                                                                            {column.archives.length} archives
                                                                                        </span>
                                                                                    </div>
                                                                                    
                                                                                    {column.archives.length > 0 && (
                                                                                        <div className="mt-2 space-y-1">
                                                                                            {column.archives.map((archive) => (
                                                                                                <div key={archive.id} className="ml-4 p-2 bg-gray-50 rounded border">
                                                                                                    <div className="flex items-center justify-between">
                                                                                                        <div>
                                                                                                            <span className="font-medium text-gray-800">
                                                                                                                📄 {archive.title}
                                                                                                            </span>
                                                                                                            <div className="text-xs text-gray-500">
                                                                                                                Ref: {archive.reference_code}
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(archive.status)}`}>
                                                                                                            {archive.status}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
