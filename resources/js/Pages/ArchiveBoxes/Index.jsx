import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, archiveBoxes, archives, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [showAddModal, setShowAddModal] = useState(false);

    const addForm = useForm({
        name: '',
        document_type: '',
        status: 'active',
        archive_id: '',
    });

    const searchForm = useForm({
        search: searchTerm,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        searchForm.get(route('archive-boxes.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addForm.post(route('archive-boxes.store'), {
            onSuccess: () => {
                setShowAddModal(false);
                addForm.reset();
            },
        });
    };

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Archive Boxes</h2>}
        >
            <Head title="Archive Boxes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header with Add Box button and Search */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                                >
                                    Add Box
                                </button>
                                
                                <form onSubmit={handleSearch} className="flex-1 max-w-md">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search boxes..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <button
                                            type="submit"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Archive Boxes Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {archiveBoxes.map((box) => (
                                    <div key={box.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        {/* Folder Icon */}
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-center justify-center h-16">
                                                <svg className="w-12 h-12 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        {/* Box Info */}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{box.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{box.document_type}</p>
                                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(box.status)}`}>
                                                {box.status}
                                            </span>
                                            
                                            {/* Action Buttons */}
                                            <div className="flex gap-2 mt-4">
                                                <Link
                                                    href={route('archive-boxes.show', box.id)}
                                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded text-center transition"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('archive-boxes.edit', box.id)}
                                                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-3 rounded text-center transition"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Empty State */}
                            {archiveBoxes.length === 0 && (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No archive boxes</h3>
                                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new archive box.</p>
                                    <div className="mt-6">
                                        <button
                                            onClick={() => setShowAddModal(true)}
                                            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
                                        >
                                            Add Box
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Box Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Archive Box</h3>
                            <form onSubmit={handleAddSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Box Name
                                    </label>
                                    <input
                                        type="text"
                                        value={addForm.data.name}
                                        onChange={(e) => addForm.setData('name', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="e.g., GM135"
                                        required
                                    />
                                    {addForm.errors.name && (
                                        <p className="text-red-500 text-xs italic">{addForm.errors.name}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Document Type
                                    </label>
                                    <input
                                        type="text"
                                        value={addForm.data.document_type}
                                        onChange={(e) => addForm.setData('document_type', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="e.g., bon de livraison"
                                        required
                                    />
                                    {addForm.errors.document_type && (
                                        <p className="text-red-500 text-xs italic">{addForm.errors.document_type}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={addForm.data.status}
                                        onChange={(e) => addForm.setData('status', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="archived">Archived</option>
                                        <option value="pending">Pending</option>
                                        <option value="disposed">Disposed</option>
                                    </select>
                                    {addForm.errors.status && (
                                        <p className="text-red-500 text-xs italic">{addForm.errors.status}</p>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Archive
                                    </label>
                                    <select
                                        value={addForm.data.archive_id}
                                        onChange={(e) => addForm.setData('archive_id', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    >
                                        <option value="">Select an archive</option>
                                        {archives.map((archive) => (
                                            <option key={archive.id} value={archive.id}>
                                                {archive.title} ({archive.reference_code})
                                            </option>
                                        ))}
                                    </select>
                                    {addForm.errors.archive_id && (
                                        <p className="text-red-500 text-xs italic">{addForm.errors.archive_id}</p>
                                    )}
                                </div>
                                <div className="flex items-center justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={addForm.processing}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        {addForm.processing ? 'Adding...' : 'Add Box'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
} 