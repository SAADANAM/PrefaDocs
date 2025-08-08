import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Settings({ auth, archiveBoxes, directions, rooms }) {
    const [activeTab, setActiveTab] = useState('box');
    const [editingBox, setEditingBox] = useState(null);
    const [editingDirection, setEditingDirection] = useState(null);
    const [editingRoom, setEditingRoom] = useState(null);

    const boxForm = useForm({
        name: '',
        document_type: '',
        status: 'active',
        archive_id: '',
    });

    const directionForm = useForm({
        name: '',
        description: '',
    });

    const roomForm = useForm({
        name: '',
        description: '',
        capacity: '',
        floor: '',
    });

    const handleBoxSubmit = (e) => {
        e.preventDefault();
        if (editingBox) {
            boxForm.put(route('settings.update-box', editingBox.id));
            setEditingBox(null);
        } else {
            boxForm.post(route('settings.store-box'));
        }
        boxForm.reset();
    };

    const handleDirectionSubmit = (e) => {
        e.preventDefault();
        if (editingDirection) {
            directionForm.put(route('settings.update-direction', editingDirection.id));
            setEditingDirection(null);
        } else {
            directionForm.post(route('settings.store-direction'));
        }
        directionForm.reset();
    };

    const handleRoomSubmit = (e) => {
        e.preventDefault();
        if (editingRoom) {
            roomForm.put(route('settings.update-room', editingRoom.id));
            setEditingRoom(null);
        } else {
            roomForm.post(route('settings.store-room'));
        }
        roomForm.reset();
    };

    const handleEditBox = (box) => {
        setEditingBox(box);
        boxForm.setData({
            name: box.name,
            document_type: box.document_type,
            status: box.status,
            archive_id: box.archive_id,
        });
    };

    const handleEditDirection = (direction) => {
        setEditingDirection(direction);
        directionForm.setData({
            name: direction.name,
            description: direction.description || '',
        });
    };

    const handleEditRoom = (room) => {
        setEditingRoom(room);
        roomForm.setData({
            name: room.name,
            description: room.description || '',
            capacity: room.capacity || '',
            floor: room.floor || '',
        });
    };

    const handleCancelEdit = () => {
        setEditingBox(null);
        setEditingDirection(null);
        setEditingRoom(null);
        boxForm.reset();
        directionForm.reset();
        roomForm.reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings</h2>}
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Background Image Container */}
                    <div 
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative"
                        style={{
                            backgroundImage: 'url("/images/menara-holding-bg.jpg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        {/* Semi-transparent overlay */}
                        <div className="absolute inset-0 bg-white bg-opacity-90"></div>
                        
                        <div className="relative z-10 p-6 text-gray-900">
                            {/* Back Button */}
                            <div className="mb-6">
                                <Link
                                    href={route('dashboard')}
                                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                    Back to Dashboard
                                </Link>
                            </div>

                            {/* Settings Title */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
                                <p className="text-gray-600">Manage boxes, directions, and rooms</p>
                            </div>

                            {/* Tab Navigation */}
                            <div className="border-b border-gray-200 mb-8">
                                <nav className="-mb-px flex space-x-8">
                                    <button
                                        onClick={() => setActiveTab('box')}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'box'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Box Management
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('direction')}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'direction'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Direction Management
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('room')}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'room'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Room Management
                                    </button>
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="space-y-6">
                                {/* Box Management Tab */}
                                {activeTab === 'box' && (
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-semibold text-gray-900">Archive Box Management</h3>
                                            <button
                                                onClick={() => setEditingBox(null)}
                                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                                            >
                                                Add New Box
                                            </button>
                                        </div>

                                        {/* Add/Edit Box Form */}
                                        {(editingBox !== null || archiveBoxes.length === 0) && (
                                            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                                <h4 className="text-md font-semibold mb-4">
                                                    {editingBox ? 'Edit Box' : 'Add New Box'}
                                                </h4>
                                                <form onSubmit={handleBoxSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                        <input
                                                            type="text"
                                                            value={boxForm.data.name}
                                                            onChange={(e) => boxForm.setData('name', e.target.value)}
                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                                                        <input
                                                            type="text"
                                                            value={boxForm.data.document_type}
                                                            onChange={(e) => boxForm.setData('document_type', e.target.value)}
                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                                        <select
                                                            value={boxForm.data.status}
                                                            onChange={(e) => boxForm.setData('status', e.target.value)}
                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                            required
                                                        >
                                                            <option value="active">Active</option>
                                                            <option value="inactive">Inactive</option>
                                                            <option value="archived">Archived</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex items-end space-x-2">
                                                        <button
                                                            type="submit"
                                                            disabled={boxForm.processing}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                                                        >
                                                            {boxForm.processing ? 'Saving...' : (editingBox ? 'Update' : 'Add')}
                                                        </button>
                                                        {editingBox && (
                                                            <button
                                                                type="button"
                                                                onClick={handleCancelEdit}
                                                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>
                                        )}

                                        {/* Boxes List */}
                                        <div className="bg-white rounded-lg shadow">
                                            <div className="px-6 py-4 border-b border-gray-200">
                                                <h4 className="text-lg font-medium text-gray-900">Archive Boxes</h4>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {archiveBoxes.map((box) => (
                                                            <tr key={box.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{box.name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{box.document_type}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                        box.status === 'active' ? 'bg-green-100 text-green-800' :
                                                                        box.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-gray-100 text-gray-800'
                                                                    }`}>
                                                                        {box.status}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    <button
                                                                        onClick={() => handleEditBox(box)}
                                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <Link
                                                                        href={route('settings.delete-box', box.id)}
                                                                        method="delete"
                                                                        as="button"
                                                                        className="text-red-600 hover:text-red-900"
                                                                        onClick={(e) => {
                                                                            if (!confirm('Are you sure you want to delete this box?')) {
                                                                                e.preventDefault();
                                                                            }
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Direction Management Tab */}
                                {activeTab === 'direction' && (
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-semibold text-gray-900">Direction Management</h3>
                                            <button
                                                onClick={() => setEditingDirection(null)}
                                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                                            >
                                                Add New Direction
                                            </button>
                                        </div>

                                        {/* Add/Edit Direction Form */}
                                        {(editingDirection !== null || directions.length === 0) && (
                                            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                                <h4 className="text-md font-semibold mb-4">
                                                    {editingDirection ? 'Edit Direction' : 'Add New Direction'}
                                                </h4>
                                                <form onSubmit={handleDirectionSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                        <input
                                                            type="text"
                                                            value={directionForm.data.name}
                                                            onChange={(e) => directionForm.setData('name', e.target.value)}
                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                        <input
                                                            type="text"
                                                            value={directionForm.data.description}
                                                            onChange={(e) => directionForm.setData('description', e.target.value)}
                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div className="flex items-end">
                                                        <button
                                                            type="submit"
                                                            disabled={directionForm.processing}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                                                        >
                                                            {directionForm.processing ? 'Saving...' : (editingDirection ? 'Update' : 'Add')}
                                                        </button>
                                                        {editingDirection && (
                                                            <button
                                                                type="button"
                                                                onClick={handleCancelEdit}
                                                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition ml-2"
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>
                                        )}

                                        {/* Directions List */}
                                        <div className="bg-white rounded-lg shadow">
                                            <div className="px-6 py-4 border-b border-gray-200">
                                                <h4 className="text-lg font-medium text-gray-900">Directions</h4>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {directions.map((direction) => (
                                                            <tr key={direction.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{direction.name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{direction.description || '-'}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    <button
                                                                        onClick={() => handleEditDirection(direction)}
                                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <Link
                                                                        href={route('settings.delete-direction', direction.id)}
                                                                        method="delete"
                                                                        as="button"
                                                                        className="text-red-600 hover:text-red-900"
                                                                        onClick={(e) => {
                                                                            if (!confirm('Are you sure you want to delete this direction?')) {
                                                                                e.preventDefault();
                                                                            }
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Room Management Tab */}
                                {activeTab === 'room' && (
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-semibold text-gray-900">Room Management</h3>
                                            <button
                                                onClick={() => setEditingRoom(null)}
                                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                                            >
                                                Add New Room
                                            </button>
                                        </div>

                                        {/* Add/Edit Room Form */}
                                        {(editingRoom !== null || rooms.length === 0) && (
                                            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                                <h4 className="text-md font-semibold mb-4">
                                                    {editingRoom ? 'Edit Room' : 'Add New Room'}
                                                </h4>
                                                <form onSubmit={handleRoomSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                        <input
                                                            type="text"
                                                            value={roomForm.data.name}
                                                            onChange={(e) => roomForm.setData('name', e.target.value)}
                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                        <input
                                                            type="text"
                                                            value={roomForm.data.description}
                                                            onChange={(e) => roomForm.setData('description', e.target.value)}
                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                                                        <input
                                                            type="number"
                                                            value={roomForm.data.capacity}
                                                            onChange={(e) => roomForm.setData('capacity', e.target.value)}
                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                                                        <input
                                                            type="text"
                                                            value={roomForm.data.floor}
                                                            onChange={(e) => roomForm.setData('floor', e.target.value)}
                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div className="flex items-end space-x-2">
                                                        <button
                                                            type="submit"
                                                            disabled={roomForm.processing}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                                                        >
                                                            {roomForm.processing ? 'Saving...' : (editingRoom ? 'Update' : 'Add')}
                                                        </button>
                                                        {editingRoom && (
                                                            <button
                                                                type="button"
                                                                onClick={handleCancelEdit}
                                                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>
                                        )}

                                        {/* Rooms List */}
                                        <div className="bg-white rounded-lg shadow">
                                            <div className="px-6 py-4 border-b border-gray-200">
                                                <h4 className="text-lg font-medium text-gray-900">Rooms</h4>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Floor</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {rooms.map((room) => (
                                                            <tr key={room.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.description || '-'}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.capacity || '-'}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.floor || '-'}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    <button
                                                                        onClick={() => handleEditRoom(room)}
                                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <Link
                                                                        href={route('settings.delete-room', room.id)}
                                                                        method="delete"
                                                                        as="button"
                                                                        className="text-red-600 hover:text-red-900"
                                                                        onClick={(e) => {
                                                                            if (!confirm('Are you sure you want to delete this room?')) {
                                                                                e.preventDefault();
                                                                            }
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 