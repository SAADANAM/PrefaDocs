import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function StorageAvailabilityIndex({ auth, shelves, rooms, racks, filters, sort }) {
    const [localFilters, setLocalFilters] = useState({
        room_filter: filters.room_filter || '',
        rack_filter: filters.rack_filter || '',
        availability_filter: filters.availability_filter || '',
        min_availability: filters.min_availability || '',
    });

    const [localSort, setLocalSort] = useState({
        sort_by: sort.sort_by || 'availability_percentage',
        sort_order: sort.sort_order || 'desc',
    });

    const [showFilters, setShowFilters] = useState(false);

    // Apply filters with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(route('storage-availability.index'), {
                ...localFilters,
                ...localSort,
            }, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [localFilters, localSort]);

    const handleSort = (column) => {
        const newSortOrder = localSort.sort_by === column && localSort.sort_order === 'asc' ? 'desc' : 'asc';
        setLocalSort({
            sort_by: column,
            sort_order: newSortOrder,
        });
    };

    const clearFilters = () => {
        setLocalFilters({
            room_filter: '',
            rack_filter: '',
            availability_filter: '',
            min_availability: '',
        });
        setLocalSort({
            sort_by: 'availability_percentage',
            sort_order: 'desc',
        });
    };

    const getAvailabilityColor = (percentage) => {
        if (percentage >= 80) return 'text-green-600 bg-green-100';
        if (percentage >= 60) return 'text-blue-600 bg-blue-100';
        if (percentage >= 40) return 'text-yellow-600 bg-yellow-100';
        if (percentage >= 20) return 'text-orange-600 bg-orange-100';
        return 'text-red-600 bg-red-100';
    };

    const getAvailabilityIcon = (percentage) => {
        if (percentage >= 80) return '🟢';
        if (percentage >= 60) return '🔵';
        if (percentage >= 40) return '🟡';
        if (percentage >= 20) return '🟠';
        return '🔴';
    };

    const totalShelves = shelves.length;
    const availableShelves = shelves.filter(shelf => shelf.has_available_space).length;
    const averageAvailability = totalShelves > 0 
        ? Math.round(shelves.reduce((sum, shelf) => sum + shelf.availability_percentage, 0) / totalShelves)
        : 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Storage Availability</h2>}
        >
            <Head title="Storage Availability" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header with Stats */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Storage Availability Overview</h3>
                                        <p className="text-sm text-gray-600 mt-1">Monitor and manage storage space across all rooms</p>
                                    </div>
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                                        </svg>
                                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                                    </button>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-blue-600">Total Shelves</p>
                                                <p className="text-2xl font-bold text-blue-900">{totalShelves}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-green-600">Available Shelves</p>
                                                <p className="text-2xl font-bold text-green-900">{availableShelves}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-yellow-600">Avg. Availability</p>
                                                <p className="text-2xl font-bold text-yellow-900">{averageAvailability}%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-purple-600">Utilization</p>
                                                <p className="text-2xl font-bold text-purple-900">{100 - averageAvailability}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Filters */}
                            {showFilters && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                                            <select
                                                value={localFilters.room_filter}
                                                onChange={(e) => setLocalFilters({...localFilters, room_filter: e.target.value})}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">All Rooms</option>
                                                {rooms.map((room) => (
                                                    <option key={room} value={room}>{room}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Rack</label>
                                            <select
                                                value={localFilters.rack_filter}
                                                onChange={(e) => setLocalFilters({...localFilters, rack_filter: e.target.value})}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">All Racks</option>
                                                {racks.map((rack) => (
                                                    <option key={rack} value={rack}>{rack}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Availability Status</label>
                                            <select
                                                value={localFilters.availability_filter}
                                                onChange={(e) => setLocalFilters({...localFilters, availability_filter: e.target.value})}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">All Status</option>
                                                <option value="excellent">Excellent (≥80%)</option>
                                                <option value="good">Good (60-79%)</option>
                                                <option value="moderate">Moderate (40-59%)</option>
                                                <option value="limited">Limited (20-39%)</option>
                                                <option value="full">Full (&lt;20%)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Min. Availability %</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={localFilters.min_availability}
                                                onChange={(e) => setLocalFilters({...localFilters, min_availability: e.target.value})}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="e.g., 50"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={clearFilters}
                                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Storage Availability Table */}
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th 
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleSort('room')}
                                                >
                                                    <div className="flex items-center">
                                                        Room
                                                        {localSort.sort_by === 'room' && (
                                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={localSort.sort_order === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </th>
                                                <th 
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleSort('rack')}
                                                >
                                                    <div className="flex items-center">
                                                        Rack
                                                        {localSort.sort_by === 'rack' && (
                                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={localSort.sort_order === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </th>
                                                <th 
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleSort('shelf')}
                                                >
                                                    <div className="flex items-center">
                                                        Shelf
                                                        {localSort.sort_by === 'shelf' && (
                                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={localSort.sort_order === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </th>
                                                <th 
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleSort('dimensions')}
                                                >
                                                    <div className="flex items-center">
                                                        Dimensions (L × W)
                                                        {localSort.sort_by === 'dimensions' && (
                                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={localSort.sort_order === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </th>
                                                <th 
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleSort('free_space')}
                                                >
                                                    <div className="flex items-center">
                                                        Free Space
                                                        {localSort.sort_by === 'free_space' && (
                                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={localSort.sort_order === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </th>
                                                <th 
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleSort('availability_percentage')}
                                                >
                                                    <div className="flex items-center">
                                                        Availability %
                                                        {localSort.sort_by === 'availability_percentage' && (
                                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={localSort.sort_order === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {shelves.map((shelf) => (
                                                <tr key={shelf.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {shelf.room_name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {shelf.rack_name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {shelf.shelf_name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {shelf.length_width}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <span className="font-medium">{shelf.free_space}</span> / {shelf.total_capacity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityColor(shelf.availability_percentage)}`}>
                                                                {getAvailabilityIcon(shelf.availability_percentage)} {shelf.availability_percentage}%
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityColor(shelf.availability_percentage)}`}>
                                                            {shelf.availability_status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Empty State */}
                                {shelves.length === 0 && (
                                    <div className="text-center py-12">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No shelves found</h3>
                                        <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or create some rooms and shelves first.</p>
                                    </div>
                                )}
                            </div>

                            {/* Results Summary */}
                            {shelves.length > 0 && (
                                <div className="mt-4 text-sm text-gray-600">
                                    Showing {shelves.length} shelf{shelves.length !== 1 ? 'es' : ''} 
                                    {availableShelves > 0 && (
                                        <span className="text-green-600 font-medium"> • {availableShelves} with available space</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 