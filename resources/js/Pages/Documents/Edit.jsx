import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, document, archiveBoxes }) {
    const form = useForm({
        name: document.name,
        category: document.category,
        year: document.year,
        archive_box_id: document.archive_box_id,
        document_file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.put(route('documents.update', document.id), {
            preserveScroll: true,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        form.setData('document_file', file);
    };

    const categories = [
        'Invoice',
        'Contract',
        'Report',
        'Letter',
        'Receipt',
        'Form',
        'Manual',
        'Certificate',
        'Other'
    ];

    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        years.push(year);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Document</h2>}
        >
            <Head title={`Edit Document - ${document.name}`} />

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
                            </div>

                            {/* Edit Form */}
                            <form onSubmit={handleSubmit} className="max-w-2xl" encType="multipart/form-data">
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Document Name
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="e.g., Invoice #12345"
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.name}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={form.data.category}
                                        onChange={(e) => form.setData('category', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.category && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.category}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Year
                                    </label>
                                    <select
                                        value={form.data.year}
                                        onChange={(e) => form.setData('year', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    >
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.year && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.year}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Archive Box
                                    </label>
                                    <select
                                        value={form.data.archive_box_id}
                                        onChange={(e) => form.setData('archive_box_id', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    >
                                        <option value="">Select an archive box</option>
                                        {archiveBoxes.map((box) => (
                                            <option key={box.id} value={box.id}>
                                                {box.name} ({box.document_type})
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.archive_box_id && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.archive_box_id}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        File Management
                                    </label>
                                    
                                    {/* Current File Info */}
                                    {document.file_path && (
                                        <div className="mb-4 p-3 bg-gray-50 rounded-md border">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                    </svg>
                                                    <span className="text-sm text-gray-600">
                                                        Current file: {document.file_path.split('/').pop()}
                                                    </span>
                                                </div>
                                                <Link
                                                    href={route('documents.download', document.id)}
                                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                                >
                                                    Download
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {/* File Upload */}
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="document_file"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>{document.file_path ? 'Replace file' : 'Upload a file'}</span>
                                                    <input
                                                        id="document_file"
                                                        name="document_file"
                                                        type="file"
                                                        className="sr-only"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PDF, DOC, DOCX up to 10MB
                                            </p>
                                            {document.file_path && (
                                                <p className="text-xs text-amber-600">
                                                    ⚠️ Uploading a new file will replace the current one
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {form.data.document_file && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            New file: {form.data.document_file.name}
                                        </div>
                                    )}
                                    {form.errors.document_file && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.document_file}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('documents.show', document.id)}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        {form.processing ? 'Updating...' : 'Update Document'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 