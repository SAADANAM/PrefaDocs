import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, archiveBoxes, selectedArchiveBoxId }) {
    const form = useForm({
        name: '',
        category: '',
        year: new Date().getFullYear(),
        archive_box_id: selectedArchiveBoxId || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('documents.store'));
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Document</h2>}
        >
            <Head title="Add Document" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header with Back button */}
                            <div className="flex justify-between items-center mb-6">
                                <Link
                                    href={route('documents.index', { archive_box_id: selectedArchiveBoxId })}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    ← Back to Documents
                                </Link>
                            </div>

                            {/* Create Form */}
                            <form onSubmit={handleSubmit} className="max-w-2xl">
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

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('documents.index', { archive_box_id: selectedArchiveBoxId })}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        {form.processing ? 'Creating...' : 'Create Document'}
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