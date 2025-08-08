import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, racks }) {
    const form = useForm({
        name: '',
        rack_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('columns.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Column</h2>}
        >
            <Head title="Create Column" />

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
                            </div>

                            {/* Create Form */}
                            <form onSubmit={handleSubmit} className="max-w-2xl">
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Column Name
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="e.g., Column A"
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.name}</p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Rack
                                    </label>
                                    <select
                                        value={form.data.rack_id}
                                        onChange={(e) => form.setData('rack_id', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    >
                                        <option value="">Select a rack</option>
                                        {racks.map((rack) => (
                                            <option key={rack.id} value={rack.id}>
                                                {rack.name}
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.rack_id && (
                                        <p className="text-red-500 text-xs italic mt-1">{form.errors.rack_id}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('columns.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        {form.processing ? 'Creating...' : 'Create Column'}
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