import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Step4({ auth }) {
    const form = useForm({
        company_name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!form.data.company_name.trim()) {
            alert('Please enter a company name');
            return;
        }

        form.post(route('multi-step.store-company'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Step 4: Enter Company</h2>}
        >
            <Head title="Step 4: Enter Company" />

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
                                        <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">✓</div>
                                        <div className="bg-green-500 h-1 w-16 mx-2"></div>
                                        <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">✓</div>
                                        <div className="bg-green-500 h-1 w-16 mx-2"></div>
                                        <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">4</div>
                                    </div>
                                </div>
                                <div className="text-center mt-2 text-sm text-gray-600">
                                    Step 4 of 4: Enter Company Name
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Company Name Input */}
                                <div className="mb-8">
                                    <div className="max-w-md mx-auto">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                                            Enter Company Name
                                        </h3>
                                        
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Company Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.company_name}
                                                onChange={(e) => form.setData('company_name', e.target.value)}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg py-3 px-4"
                                                placeholder="Enter company name"
                                                required
                                            />
                                            {form.errors.company_name && (
                                                <p className="mt-1 text-sm text-red-600">{form.errors.company_name}</p>
                                            )}
                                        </div>

                                        {/* Summary Card */}
                                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                            <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                                            <p className="text-sm text-gray-600">
                                                You're about to complete the multi-step process. All previous selections have been saved.
                                            </p>
                                        </div>
                                    </div>
                                </div>

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
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded transition flex items-center"
                                    >
                                        {form.processing ? 'Processing...' : 'Finish'}
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