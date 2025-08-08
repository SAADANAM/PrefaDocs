import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, rack, shelves }) {
    const form = useForm({
        name: rack.name,
        shelf_id: rack.shelf_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.put(route('racks.update', rack.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Rack</h2>}
        >
            <Head title={`Edit Rack - ${rack.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header with Back button */}
                            <div className="flex justify-between items-center mb-6">
                                <Link
                                    href={route('racks.index')}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    ← Back to Racks
                                </Link>
                            </div>

                            {/* Edit Form */}
                            <form onSubmit={handleSubmit} className="max-w-2xl">
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Rack Name
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="e.g., Rack A"
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.name}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Shelf
                                    </label>
                                    <select
                                        value={form.data.shelf_id}
                                        onChange={(e) => form.setData('shelf_id', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    >
                                        <option value="">Select a shelf</option>
                                        {shelves.map((shelf) => (
                                            <option key={shelf.id} value={shelf.id}>
                                                {shelf.name}
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.shelf_id && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.shelf_id}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('racks.show', rack.id)}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        {form.processing ? 'Updating...' : 'Update Rack'}
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