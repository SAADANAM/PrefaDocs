import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ArchiveWithLocation({ auth, document, archiveBoxes }) {
    const [step, setStep] = useState(1);
    const [selectedShelf, setSelectedShelf] = useState(null);
    const [selectedRack, setSelectedRack] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [shelves, setShelves] = useState([]);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        name: document?.name || '',
        category: document?.category || '',
        year: document?.year || new Date().getFullYear(),
        archive_box_id: document?.archive_box_id || '',
        shelf_id: '',
        rack_id: '',
        column_id: '',
    });

    useEffect(() => {
        // Load shelves data when component mounts
        fetchShelves();
    }, []);

    const fetchShelves = async () => {
        setLoading(true);
        try {
            const response = await fetch('/shelves-location-selection');
            const data = await response.json();
            setShelves(data);
        } catch (error) {
            console.error('Error fetching shelves:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (step === 1) {
            // Validate document form
            if (form.data.name && form.data.category && form.data.year && form.data.archive_box_id) {
                setStep(2);
            }
        } else if (step === 2) {
            // Validate location selection
            if (selectedShelf && selectedRack && selectedColumn) {
                form.setData('shelf_id', selectedShelf.id);
                form.setData('rack_id', selectedRack.id);
                form.setData('column_id', selectedColumn.id);
                // Submit the form
                form.post(route('documents.store'));
            }
        }
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        }
    };

    const handleShelfSelect = (shelf) => {
        setSelectedShelf(shelf);
        setSelectedRack(null);
        setSelectedColumn(null);
    };

    const handleRackSelect = (rack) => {
        setSelectedRack(rack);
        setSelectedColumn(null);
    };

    const handleColumnSelect = (column) => {
        setSelectedColumn(column);
    };

    const categories = [
        'Invoice', 'Contract', 'Report', 'Letter', 'Receipt', 'Form', 'Manual', 'Certificate', 'Other'
    ];

    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        years.push(year);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Archive Document</h2>}
        >
            <Head title="Archive Document" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Progress Steps */}
                            <div className="mb-8">
                                <div className="flex items-center justify-center">
                                    <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                                        <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                                            1
                                        </div>
                                        <span className="ml-2 font-medium">Document Details</span>
                                    </div>
                                    <div className={`w-16 h-0.5 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                    <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                                        <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                                            2
                                        </div>
                                        <span className="ml-2 font-medium">Location Selection</span>
                                    </div>
                                </div>
                            </div>

                            {/* Step 1: Document Details */}
                            {step === 1 && (
                                <div className="max-w-2xl">
                                    <h3 className="text-lg font-semibold mb-6">Document Information</h3>
                                    
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Document Name
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.name}
                                            onChange={(e) => form.setData('name', e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="e.g., Invoice #12345"
                                            required
                                        />
                                        {form.errors.name && (
                                            <p className="text-red-500 text-xs italic mt-1">{form.errors.name}</p>
                                        )}
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Category
                                        </label>
                                        <select
                                            value={form.data.category}
                                            onChange={(e) => form.setData('category', e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        {form.errors.category && (
                                            <p className="text-red-500 text-xs italic mt-1">{form.errors.category}</p>
                                        )}
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Year
                                        </label>
                                        <select
                                            value={form.data.year}
                                            onChange={(e) => form.setData('year', e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        >
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                        {form.errors.year && (
                                            <p className="text-red-500 text-xs italic mt-1">{form.errors.year}</p>
                                        )}
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Archive Box
                                        </label>
                                        <select
                                            value={form.data.archive_box_id}
                                            onChange={(e) => form.setData('archive_box_id', e.target.value)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        >
                                            <option value="">Select an archive box</option>
                                            {archiveBoxes.map((box) => (
                                                <option key={box.id} value={box.id}>
                                                    {box.name} ({box.document_type})
                                                </option>
                                            ))}
                                        </select>
                                        {form.errors.archive_box_id && (
                                            <p className="text-red-500 text-xs italic mt-1">{form.errors.archive_box_id}</p>
                                        )}
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleNext}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Location Selection */}
                            {step === 2 && (
                                <div className="max-w-4xl">
                                    <h3 className="text-lg font-semibold mb-6">Location Selection</h3>
                                    
                                    {loading ? (
                                        <div className="text-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                            <p className="mt-2 text-gray-600">Loading locations...</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            {/* Room Selection */}
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-4">Select a Room</h4>
                                                <div className="space-y-3">
                                                    {shelves.map((shelf) => (
                                                        <div
                                                            key={shelf.id}
                                                            onClick={() => handleShelfSelect(shelf)}
                                                            className={`p-4 border rounded-lg cursor-pointer transition ${
                                                                selectedShelf?.id === shelf.id
                                                                    ? 'border-blue-500 bg-blue-50'
                                                                    : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h5 className="font-medium text-gray-900">{shelf.room_name || shelf.name}</h5>
                                                                    <p className="text-sm text-gray-600">Room ID: {shelf.room_id}</p>
                                                                    <p className="text-sm text-gray-600">Shelf: {shelf.name}</p>
                                                                </div>
                                                                <div className="text-right text-sm text-gray-500">
                                                                    <p>Dimensions: {shelf.shelf_dimensions}</p>
                                                                    <p>Depth: {shelf.depth}cm</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Rack and Column Selection */}
                                            {selectedShelf && (
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 mb-4">Select Storage Location</h4>
                                                    
                                                    {/* Rack Selection */}
                                                    <div className="mb-6">
                                                        <h5 className="font-medium text-gray-700 mb-3">Racks in {selectedShelf.name}</h5>
                                                        <div className="space-y-2">
                                                            {selectedShelf.racks.map((rack) => (
                                                                <div
                                                                    key={rack.id}
                                                                    onClick={() => handleRackSelect(rack)}
                                                                    className={`p-3 border rounded cursor-pointer transition ${
                                                                        selectedRack?.id === rack.id
                                                                            ? 'border-blue-500 bg-blue-50'
                                                                            : 'border-gray-200 hover:border-gray-300'
                                                                    }`}
                                                                >
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="font-medium">{rack.name}</span>
                                                                        <span className="text-sm text-gray-500">
                                                                            {rack.columns.length} columns
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Column Selection */}
                                                    {selectedRack && (
                                                        <div>
                                                            <h5 className="font-medium text-gray-700 mb-3">Columns in {selectedRack.name}</h5>
                                                            <div className="space-y-2">
                                                                {selectedRack.columns.map((column) => (
                                                                    <div
                                                                        key={column.id}
                                                                        onClick={() => handleColumnSelect(column)}
                                                                        className={`p-3 border rounded cursor-pointer transition ${
                                                                            selectedColumn?.id === column.id
                                                                                ? 'border-blue-500 bg-blue-50'
                                                                                : 'border-gray-200 hover:border-gray-300'
                                                                        }`}
                                                                    >
                                                                        <span className="font-medium">{column.name}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex justify-between mt-8">
                                        <button
                                            onClick={handleBack}
                                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={!selectedShelf || !selectedRack || !selectedColumn}
                                            className={`font-bold py-2 px-4 rounded transition ${
                                                selectedShelf && selectedRack && selectedColumn
                                                    ? 'bg-green-500 hover:bg-green-600 text-white'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            Select Location
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 