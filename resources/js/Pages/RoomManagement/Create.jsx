import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function RoomManagementCreate({ auth, sites }) {
    const form = useForm({
        name: '',
        location: '',
        site_id: '',
        number_of_racks: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('room-management.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Room</h2>}
        >
            <Head title="Add New Room" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Room</h3>
                                <p className="text-sm text-gray-600">Enter room details and configure storage layout</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Room Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Room Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., Archive Room A, Storage Room 1"
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{form.errors.name}</p>
                                    )}
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.location}
                                        onChange={(e) => form.setData('location', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., Building A, Floor 2, North Wing"
                                        required
                                    />
                                    {form.errors.location && (
                                        <p className="mt-1 text-sm text-red-600">{form.errors.location}</p>
                                    )}
                                </div>

                                {/* Site Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Site *
                                    </label>
                                    <select
                                        value={form.data.site_id}
                                        onChange={(e) => form.setData('site_id', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select a site</option>
                                        {sites.map((site) => (
                                            <option key={site.id} value={site.id}>
                                                {site.label} ({site.code})
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.site_id && (
                                        <p className="mt-1 text-sm text-red-600">{form.errors.site_id}</p>
                                    )}
                                </div>

                                {/* Number of Racks */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Racks *
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={form.data.number_of_racks}
                                        onChange={(e) => form.setData('number_of_racks', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., 5"
                                        required
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Specify how many racks this room will contain
                                    </p>
                                    {form.errors.number_of_racks && (
                                        <p className="mt-1 text-sm text-red-600">{form.errors.number_of_racks}</p>
                                    )}
                                </div>

                                {/* Info Card */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800">
                                                Next Step: Rack Configuration
                                            </h3>
                                            <div className="mt-2 text-sm text-blue-700">
                                                <p>
                                                    After creating the room, you'll be able to configure each rack with its name and number of columns.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-between pt-6">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition flex items-center"
                                    >
                                        {form.processing ? 'Creating...' : 'Next'}
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
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