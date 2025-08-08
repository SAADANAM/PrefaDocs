import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ArchiveEdit({ archive, columns }) {
    const { data, setData, put, processing, errors } = useForm({
        title: archive.title,
        reference_code: archive.reference_code,
        date_archived: archive.date_archived,
        status: archive.status,
        column_id: archive.column_id,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('archives.update', archive.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Archive
                </h2>
            }
        >
            <Head title="Edit Archive" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('archives.index')}
                            className="text-blue-600 hover:text-blue-900"
                        >
                            ← Back to Archives
                        </Link>
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.title && <div className="mt-1 text-sm text-red-600">{errors.title}</div>}
                                    </div>

                                    <div>
                                        <label htmlFor="reference_code" className="block text-sm font-medium text-gray-700">
                                            Reference Code
                                        </label>
                                        <input
                                            type="text"
                                            id="reference_code"
                                            value={data.reference_code}
                                            onChange={(e) => setData('reference_code', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.reference_code && <div className="mt-1 text-sm text-red-600">{errors.reference_code}</div>}
                                    </div>

                                    <div>
                                        <label htmlFor="date_archived" className="block text-sm font-medium text-gray-700">
                                            Date Archived
                                        </label>
                                        <input
                                            type="date"
                                            id="date_archived"
                                            value={data.date_archived}
                                            onChange={(e) => setData('date_archived', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.date_archived && <div className="mt-1 text-sm text-red-600">{errors.date_archived}</div>}
                                    </div>

                                    <div>
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        {errors.status && <div className="mt-1 text-sm text-red-600">{errors.status}</div>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="column_id" className="block text-sm font-medium text-gray-700">
                                            Location (Column)
                                        </label>
                                        <select
                                            id="column_id"
                                            value={data.column_id}
                                            onChange={(e) => setData('column_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Select a column</option>
                                            {columns.map((column) => (
                                                <option key={column.id} value={column.id}>
                                                    {column.rack.shelf.name} → {column.rack.name} → {column.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.column_id && <div className="mt-1 text-sm text-red-600">{errors.column_id}</div>}
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-3">
                                    <Link
                                        href={route('archives.index')}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        {processing ? 'Updating...' : 'Update Archive'}
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