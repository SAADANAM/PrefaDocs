import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Step1({ auth, directions }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedDirection, setSelectedDirection] = useState('');

    const form = useForm({
        direction_id: '',
        new_direction_name: '',
        new_direction_description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (showAddForm) {
            // Validate new direction fields
            if (!form.data.new_direction_name.trim()) {
                alert('Please enter a direction name');
                return;
            }
        } else {
            // Validate selection
            if (!selectedDirection) {
                alert('Please select a direction or add a new one');
                return;
            }
            form.setData('direction_id', selectedDirection);
        }

        form.post(route('multi-step.store-direction'));
    };

    const handleDirectionSelect = (directionId) => {
        setSelectedDirection(directionId);
        setShowAddForm(false);
        form.setData('direction_id', directionId);
        form.setData('new_direction_name', '');
        form.setData('new_direction_description', '');
    };

    const handleAddNew = () => {
        setShowAddForm(true);
        setSelectedDirection('');
        form.setData('direction_id', '');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Step 1: Select Direction</h2>}
        >
            <Head title="Step 1: Select Direction" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Progress Indicator */}
                            <div className="mb-8">
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center">
                                        <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">1</div>
                                        <div className="bg-gray-300 h-1 w-16 mx-2"></div>
                                        <div className="bg-gray-300 text-gray-500 rounded-full h-8 w-8 flex items-center justify-center font-bold">2</div>
                                        <div className="bg-gray-300 h-1 w-16 mx-2"></div>
                                        <div className="bg-gray-300 text-gray-500 rounded-full h-8 w-8 flex items-center justify-center font-bold">3</div>
                                        <div className="bg-gray-300 h-1 w-16 mx-2"></div>
                                        <div className="bg-gray-300 text-gray-500 rounded-full h-8 w-8 flex items-center justify-center font-bold">4</div>
                                    </div>
                                </div>
                                <div className="text-center mt-2 text-sm text-gray-600">
                                    Step 1 of 4: Select or Add Direction
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Existing Directions */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Existing Direction</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {directions.map((direction) => (
                                            <div
                                                key={direction.id}
                                                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                                                    selectedDirection === direction.id
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                                onClick={() => handleDirectionSelect(direction.id)}
                                            >
                                                <h4 className="font-medium text-gray-900">{direction.name}</h4>
                                                {direction.description && (
                                                    <p className="text-sm text-gray-600 mt-1">{direction.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Add New Direction Button */}
                                <div className="mb-6">
                                    <button
                                        type="button"
                                        onClick={handleAddNew}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition flex items-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                        Add New Direction
                                    </button>
                                </div>

                                {/* Add New Direction Form */}
                                {showAddForm && (
                                    <div className="mb-6 p-6 bg-gray-50 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Direction</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Direction Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.new_direction_name}
                                                    onChange={(e) => form.setData('new_direction_name', e.target.value)}
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter direction name"
                                                    required
                                                />
                                                {form.errors.new_direction_name && (
                                                    <p className="mt-1 text-sm text-red-600">{form.errors.new_direction_name}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Description
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.new_direction_description}
                                                    onChange={(e) => form.setData('new_direction_description', e.target.value)}
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter description (optional)"
                                                />
                                                {form.errors.new_direction_description && (
                                                    <p className="mt-1 text-sm text-red-600">{form.errors.new_direction_description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition flex items-center"
                                    >
                                        {form.processing ? 'Processing...' : 'Next'}
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