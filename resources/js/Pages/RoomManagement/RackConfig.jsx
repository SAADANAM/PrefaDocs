import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function RackConfig({ auth, room }) {
    const [racks, setRacks] = useState(
        Array.from({ length: room.number_of_racks }, (_, index) => ({
            name: `Rack ${index + 1}`,
            length: '',
            width: '',
            number_of_shelves: 1,
        }))
    );

    const form = useForm({
        racks: racks,
    });

    const handleRackChange = (index, field, value) => {
        const updatedRacks = [...racks];
        updatedRacks[index] = { ...updatedRacks[index], [field]: value };
        setRacks(updatedRacks);
        form.setData('racks', updatedRacks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('room-management.store-rack-config', room.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Configure Racks</h2>}
        >
            <Head title="Configure Racks" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Configure Racks for {room.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Set up {room.number_of_racks} racks with dimensions and shelf counts
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
                                {/* Racks Configuration */}
                                <div className="space-y-6">
                                    <h4 className="text-md font-semibold text-gray-900">Rack Configuration</h4>
                                    
                                    {racks.map((rack, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h5 className="text-sm font-medium text-gray-900">
                                                    Rack {index + 1}
                                                </h5>
                                                <span className="text-xs text-gray-500">
                                                    #{index + 1} of {room.number_of_racks}
                                                </span>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Rack Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={rack.name}
                                                        onChange={(e) => handleRackChange(index, 'name', e.target.value)}
                                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder={`e.g., Rack ${index + 1}, Archive Rack A`}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Length (cm) *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        min="0.01"
                                                        value={rack.length}
                                                        onChange={(e) => handleRackChange(index, 'length', e.target.value)}
                                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="e.g., 120.5"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Width (cm) *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        min="0.01"
                                                        value={rack.width}
                                                        onChange={(e) => handleRackChange(index, 'width', e.target.value)}
                                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="e.g., 60.0"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        # of Shelves *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={rack.number_of_shelves}
                                                        onChange={(e) => handleRackChange(index, 'number_of_shelves', parseInt(e.target.value))}
                                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="e.g., 5"
                                                        required
                                                    />
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Number of shelf levels
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary Card */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800">
                                                Configuration Summary
                                            </h3>
                                            <div className="mt-2 text-sm text-blue-700">
                                                <p>
                                                    Total Racks: {room.number_of_racks} | 
                                                    Total Shelves: {racks.reduce((sum, rack) => sum + rack.number_of_shelves, 0)}
                                                </p>
                                                <p className="mt-1">
                                                    Next step: Configure shelves for each rack.
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