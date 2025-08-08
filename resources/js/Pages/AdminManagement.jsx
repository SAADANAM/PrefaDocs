import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminManagement({ auth, admins }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const addForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const editForm = useForm({
        name: '',
        email: '',
    });

    const resetPasswordForm = useForm({
        password: '',
        password_confirmation: '',
    });

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addForm.post(route('admin.store'), {
            onSuccess: () => {
                setShowAddModal(false);
                addForm.reset();
            },
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.put(route('admin.update', editingAdmin.id), {
            onSuccess: () => {
                setShowEditModal(false);
                setEditingAdmin(null);
                editForm.reset();
            },
        });
    };

    const [showResetModal, setShowResetModal] = useState(false);
    const [resettingAdmin, setResettingAdmin] = useState(null);

    const handleResetPassword = (adminId) => {
        setResettingAdmin(adminId);
        setShowResetModal(true);
    };

    const handleResetSubmit = (e) => {
        e.preventDefault();
        resetPasswordForm.post(route('admin.reset-password', resettingAdmin), {
            onSuccess: () => {
                setShowResetModal(false);
                setResettingAdmin(null);
                resetPasswordForm.reset();
            },
        });
    };

    const openEditModal = (admin) => {
        setEditingAdmin(admin);
        editForm.setData({
            name: admin.name,
            email: admin.email,
        });
        setShowEditModal(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Management</h2>}
        >
            <Head title="Admin Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header with Add Admin button */}
                            <div className="flex justify-between items-center mb-6">
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                                >
                                    Add Admin
                                </button>
                            </div>

                            {/* Admins Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Username
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {admins.map((admin) => (
                                            <tr key={admin.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5 text-gray-900">{admin.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5 text-gray-900">{admin.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm font-medium">
                                                    <button
                                                        onClick={() => openEditModal(admin)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleResetPassword(admin.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Reset Password
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Admin Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Admin</h3>
                            <form onSubmit={handleAddSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={addForm.data.name}
                                        onChange={(e) => addForm.setData('name', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {addForm.errors.name && (
                                        <p className="text-red-500 text-xs italic">{addForm.errors.name}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={addForm.data.email}
                                        onChange={(e) => addForm.setData('email', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {addForm.errors.email && (
                                        <p className="text-red-500 text-xs italic">{addForm.errors.email}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={addForm.data.password}
                                        onChange={(e) => addForm.setData('password', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {addForm.errors.password && (
                                        <p className="text-red-500 text-xs italic">{addForm.errors.password}</p>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={addForm.data.password_confirmation}
                                        onChange={(e) => addForm.setData('password_confirmation', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={addForm.processing}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        {addForm.processing ? 'Adding...' : 'Add Admin'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Admin Modal */}
            {showEditModal && editingAdmin && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Admin</h3>
                            <form onSubmit={handleEditSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {editForm.errors.name && (
                                        <p className="text-red-500 text-xs italic">{editForm.errors.name}</p>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={editForm.data.email}
                                        onChange={(e) => editForm.setData('email', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {editForm.errors.email && (
                                        <p className="text-red-500 text-xs italic">{editForm.errors.email}</p>
                                    )}
                                </div>
                                <div className="flex items-center justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={editForm.processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        {editForm.processing ? 'Updating...' : 'Update Admin'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {showResetModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Reset Password</h3>
                            <form onSubmit={handleResetSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={resetPasswordForm.data.password}
                                        onChange={(e) => resetPasswordForm.setData('password', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {resetPasswordForm.errors.password && (
                                        <p className="text-red-500 text-xs italic">{resetPasswordForm.errors.password}</p>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={resetPasswordForm.data.password_confirmation}
                                        onChange={(e) => resetPasswordForm.setData('password_confirmation', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowResetModal(false)}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={resetPasswordForm.processing}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        {resetPasswordForm.processing ? 'Resetting...' : 'Reset Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
} 