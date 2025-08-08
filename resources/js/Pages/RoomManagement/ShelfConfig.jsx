import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ShelfConfig({ auth, room }) {
    const [shelves, setShelves] = useState(() => {
        const initialShelves = [];
        room.shelves.forEach(shelf => {
            shelf.racks.forEach(rack => {
                const shelfConfigs = Array.from({ length: rack.number_of_shelves }, (_, index) => ({
                    name: `Shelf ${index + 1}`,
                    columns: 1,
                }));
                
                initialShelves.push({
                    rack_id: rack.id,
                    rack_name: rack.name,
                    shelf_configs: shelfConfigs,
                });
            });
        });
        return initialShelves;
    });

    const form = useForm({
        shelves: shelves,
    });

    const handleShelfChange = (rackIndex, shelfIndex, field, value) => {
        const updatedShelves = [...shelves];
        updatedShelves[rackIndex].shelf_configs[shelfIndex] = {
            ...updatedShelves[rackIndex].shelf_configs[shelfIndex],
            [field]: value
        };
        setShelves(updatedShelves);
        form.setData('shelves', updatedShelves);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('room-management.store-shelf-config', room.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Configure Shelves</h2>}
        >
            <Head title="Configure Shelves" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Configure Shelves for {room.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Set up shelves for each rack with names and column counts
                                </p>
                            </div>

                            {/* Room Info Card */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Room Name</span>
                                        <p className="text-sm text-gray-900">{room.name}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Location</span>
                                        <p className="text-sm text-gray-900">{room.location}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Site</span>
                                        <p className="text-sm text-gray-900">{room.site?.label || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Shelves Configuration */}
                                <div className="space-y-8">
                                    {shelves.map((rackData, rackIndex) => (
                                        <div key={rackData.rack_id} className="border border-gray-200 rounded-lg p-6">
                                            <div className="mb-4">
                                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {rackData.rack_name}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    Configure {rackData.shelf_configs.length} shelf levels
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                {rackData.shelf_configs.map((shelf, shelfIndex) => (
                                                    <div key={shelfIndex} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <h5 className="text-sm font-medium text-gray-900">
                                                                Shelf Level {shelfIndex + 1}
                                                            </h5>
                                                            <span className="text-xs text-gray-500">
                                                                #{shelfIndex + 1} of {rackData.shelf_configs.length}
                                                            </span>
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Shelf Name *
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={shelf.name}
                                                                    onChange={(e) => handleShelfChange(rackIndex, shelfIndex, 'name', e.target.value)}
                                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                                    placeholder={`e.g., Shelf ${shelfIndex + 1}, Top Shelf`}
                                                                    required
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Number of Columns *
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    value={shelf.columns}
                                                                    onChange={(e) => handleShelfChange(rackIndex, shelfIndex, 'columns', parseInt(e.target.value))}
                                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                                    placeholder="e.g., 5"
                                                                    required
                                                                />
                                                                <p className="mt-1 text-xs text-gray-500">
                                                                    Each column can hold multiple archives
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary Card */}
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-green-800">
                                                Final Configuration Summary
                                            </h3>
                                            <div className="mt-2 text-sm text-green-700">
                                                <p>
                                                    Total Racks: {shelves.length} | 
                                                    Total Shelves: {shelves.reduce((sum, rack) => sum + rack.shelf_configs.length, 0)} |
                                                    Total Columns: {shelves.reduce((sum, rack) => sum + rack.shelf_configs.reduce((shelfSum, shelf) => shelfSum + shelf.columns, 0), 0)}
                                                </p>
                                                <p className="mt-1">
                                                    This will create the complete storage structure for {room.name}.
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
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition flex items-center"
                                    >
                                        {form.processing ? 'Creating...' : 'Create Storage Structure'}
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
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