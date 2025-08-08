import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ShelfCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        location_description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('shelves.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Shelf
                </h2>
            }
        >
            <Head title="Create Shelf" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('shelves.index')}
                            className="text-blue-600 hover:text-blue-900"
                        >
                            ← Back to Shelves
                        </Link>
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit}>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Shelf Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            required
                                        />
                                        {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                                    </div>

                                    <div>
                                        <label htmlFor="location_description" className="block text-sm font-medium text-gray-700">
                                            Location Description
                                        </label>
                                        <textarea
                                            id="location_description"
                                            value={data.location_description}
                                            onChange={(e) => setData('location_description', e.target.value)}
                                            rows={3}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        {errors.location_description && <div className="mt-1 text-sm text-red-600">{errors.location_description}</div>}
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-3">
                                    <Link
                                        href={route('shelves.index')}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        {processing ? 'Creating...' : 'Create Shelf'}
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