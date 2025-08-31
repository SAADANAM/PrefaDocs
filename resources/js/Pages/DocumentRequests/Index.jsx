import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, documentRequests }) {
    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
            approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
            rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Document Requests</h2>}
        >
            <Head title="Document Requests" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h1 className="text-2xl font-bold text-gray-900">Document Requests</h1>
                                <p className="text-gray-600 mt-1">Manage document access requests from users</p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                User Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Document Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Requested At
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Responded At
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {documentRequests && documentRequests.length > 0 ? (
                                            documentRequests.map((request) => (
                                                <tr key={request.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {request.user?.name || 'N/A'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {request.user?.email || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {request.document?.name || 'N/A'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {request.document?.category || 'N/A'} ({request.document?.year || 'N/A'})
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getStatusBadge(request.status)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {request.requested_at ? new Date(request.requested_at).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {request.responded_at ? new Date(request.responded_at).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        {request.status === 'pending' ? (
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => {
                                                                        // Handle approve action
                                                                        console.log('Approve request:', request.id);
                                                                    }}
                                                                    className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-3 rounded transition"
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        // Handle reject action
                                                                        console.log('Reject request:', request.id);
                                                                    }}
                                                                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1 px-3 rounded transition"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400">Processed</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colspan="6" className="px-6 py-12 text-center">
                                                    <div className="text-gray-500">
                                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No document requests</h3>
                                                        <p className="mt-1 text-sm text-gray-500">There are no pending document requests at the moment.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
