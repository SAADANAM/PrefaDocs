import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Step2({ auth, services }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedService, setSelectedService] = useState('');

    const form = useForm({
        service_id: '',
        new_service_name: '',
        new_service_description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (showAddForm) {
            // Validate new service fields
            if (!form.data.new_service_name.trim()) {
                alert('Please enter a service name');
                return;
            }
        } else {
            // Validate selection
            if (!selectedService) {
                alert('Please select a service or add a new one');
                return;
            }
            form.setData('service_id', selectedService);
        }

        form.post(route('multi-step.store-service'));
    };

    const handleServiceSelect = (serviceId) => {
        setSelectedService(serviceId);
        setShowAddForm(false);
        form.setData('service_id', serviceId);
        form.setData('new_service_name', '');
        form.setData('new_service_description', '');
    };

    const handleAddNew = () => {
        setShowAddForm(true);
        setSelectedService('');
        form.setData('service_id', '');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Step 2: Select Service</h2>}
        >
            <Head title="Step 2: Select Service" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Progress Indicator */}
                            <div className="mb-8">
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center">
                                        <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">✓</div>
                                        <div className="bg-green-500 h-1 w-16 mx-2"></div>
                                        <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">2</div>
                                        <div className="bg-gray-300 h-1 w-16 mx-2"></div>
                                        <div className="bg-gray-300 text-gray-500 rounded-full h-8 w-8 flex items-center justify-center font-bold">3</div>
                                        <div className="bg-gray-300 h-1 w-16 mx-2"></div>
                                        <div className="bg-gray-300 text-gray-500 rounded-full h-8 w-8 flex items-center justify-center font-bold">4</div>
                                    </div>
                                </div>
                                <div className="text-center mt-2 text-sm text-gray-600">
                                    Step 2 of 4: Select or Add Service
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Existing Services */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Existing Service</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {services.map((service) => (
                                            <div
                                                key={service.id}
                                                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                                                    selectedService === service.id
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                                onClick={() => handleServiceSelect(service.id)}
                                            >
                                                <h4 className="font-medium text-gray-900">{service.name}</h4>
                                                {service.description && (
                                                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Add New Service Button */}
                                <div className="mb-6">
                                    <button
                                        type="button"
                                        onClick={handleAddNew}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition flex items-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                        Add New Service
                                    </button>
                                </div>

                                {/* Add New Service Form */}
                                {showAddForm && (
                                    <div className="mb-6 p-6 bg-gray-50 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Service</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Service Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.new_service_name}
                                                    onChange={(e) => form.setData('new_service_name', e.target.value)}
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter service name"
                                                    required
                                                />
                                                {form.errors.new_service_name && (
                                                    <p className="mt-1 text-sm text-red-600">{form.errors.new_service_name}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Description
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.new_service_description}
                                                    onChange={(e) => form.setData('new_service_description', e.target.value)}
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter description (optional)"
                                                />
                                                {form.errors.new_service_description && (
                                                    <p className="mt-1 text-sm text-red-600">{form.errors.new_service_description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded transition flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                        Back
                                    </button>
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