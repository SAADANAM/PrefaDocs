import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, archiveBox, archives }) {
    const form = useForm({
        name: archiveBox.name,
        document_type: archiveBox.document_type,
        status: archiveBox.status,
        archive_id: archiveBox.archive_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.put(route('archive-boxes.update', archiveBox.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Archive Box</h2>}
        >
            <Head title={`Edit Archive Box - ${archiveBox.name}`} />

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
                            </div>

                            {/* Edit Form */}
                            <form onSubmit={handleSubmit} className="max-w-2xl">
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Box Name
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="e.g., GM135"
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.name}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Document Type
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.document_type}
                                        onChange={(e) => form.setData('document_type', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="e.g., bon de livraison"
                                        required
                                    />
                                    {form.errors.document_type && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.document_type}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={form.data.status}
                                        onChange={(e) => form.setData('status', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="archived">Archived</option>
                                        <option value="pending">Pending</option>
                                        <option value="disposed">Disposed</option>
                                    </select>
                                    {form.errors.status && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.status}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Archive
                                    </label>
                                    <select
                                        value={form.data.archive_id}
                                        onChange={(e) => form.setData('archive_id', e.target.value)}
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
                                    {form.errors.archive_id && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.archive_id}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('archive-boxes.show', archiveBox.id)}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        {form.processing ? 'Updating...' : 'Update Box'}
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