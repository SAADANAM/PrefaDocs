import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
    const [storageDropdownOpen, setStorageDropdownOpen] = useState(false);
    const [systemDropdownOpen, setSystemDropdownOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Left side - Logo and Navigation */}
                        <div className="flex items-center">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="flex items-center">
                                    <ApplicationLogo className="block h-8 w-auto fill-current text-indigo-600" />
                                    <span className="ml-2 text-xl font-bold text-gray-900">Archive App</span>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:ml-8 md:flex md:space-x-1">
                                {/* Top-level links */}
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('archives.index')}
                                    active={route().current('archives.*')}
                                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Archives
                                </NavLink>
                                <NavLink
                                    href={route('archive-boxes.index')}
                                    active={route().current('archive-boxes.*')}
                                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Archive Boxes
                                </NavLink>
                                <NavLink
                                    href={route('documents.index')}
                                    active={route().current('documents.*')}
                                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Documents
                                </NavLink>
                                
                                {/* Admin Dropdown */}
                                {user.isAdmin && (
                                    <div className="relative">
                                        <button
                                            onClick={() => {
                                                setAdminDropdownOpen(!adminDropdownOpen);
                                                setStorageDropdownOpen(false);
                                                setSystemDropdownOpen(false);
                                            }}
                                            className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Admin
                                            <svg 
                                                className="ml-1.5 h-4 w-4 transition-transform duration-200" 
                                                style={{ transform: adminDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                        {adminDropdownOpen && (
                                            <div className="absolute left-0 z-50 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-100">
                                                <div className="py-2">
                                                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                                        Administration
                                                    </div>
                                                    <Link
                                                        href={route('admin.index')}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                                                    >
                                                        Admin Management
                                                    </Link>
                                                    <Link
                                                        href={route('document-requests.index')}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                                                    >
                                                        Document Requests
                                                    </Link>
                                                    <Link
                                                        href={route('multi-step.step1')}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                                                    >
                                                        Multi-Step Setup
                                                    </Link>
                                                    <Link
                                                        href={route('settings.index')}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                                                    >
                                                        Settings
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Storage Dropdown */}
                                {user.isAdmin && (
                                    <div className="relative">
                                        <button
                                            onClick={() => {
                                                setStorageDropdownOpen(!storageDropdownOpen);
                                                setAdminDropdownOpen(false);
                                                setSystemDropdownOpen(false);
                                            }}
                                            className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Storage
                                            <svg 
                                                className="ml-1.5 h-4 w-4 transition-transform duration-200" 
                                                style={{ transform: storageDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                        {storageDropdownOpen && (
                                            <div className="absolute left-0 z-50 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-100">
                                                <div className="py-2">
                                                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                                        Storage Management
                                                    </div>
                                                    <Link
                                                        href={route('shelves.index')}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                                                    >
                                                        Shelves
                                                    </Link>
                                                    <Link
                                                        href={route('racks.index')}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                                                    >
                                                        Racks
                                                    </Link>
                                                    <Link
                                                        href={route('columns.index')}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                                                    >
                                                        Columns
                                                    </Link>
                                                    <Link
                                                        href={route('room-management.index')}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                                                    >
                                                        Room Management
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* System Dropdown */}
                                {user.isAdmin && (
                                    <div className="relative">
                                        <button
                                            onClick={() => {
                                                setSystemDropdownOpen(!systemDropdownOpen);
                                                setAdminDropdownOpen(false);
                                                setStorageDropdownOpen(false);
                                            }}
                                            className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            System
                                            <svg 
                                                className="ml-1.5 h-4 w-4 transition-transform duration-200" 
                                                style={{ transform: systemDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                        {systemDropdownOpen && (
                                            <div className="absolute left-0 z-50 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-100">
                                                <div className="py-2">
                                                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                                        System Configuration
                                                    </div>
                                                    <Link
                                                        href={route('box-types.index')}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                                                    >
                                                        Box Types
                                                    </Link>
                                                    <Link
                                                        href={route('directions.index')}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                                                    >
                                                        Direction Management
                                                    </Link>
                                                    <Link
                                                        href={route('storage-availability.index')}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                                                    >
                                                        Storage Availability
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right side - User Profile */}
                        <div className="flex items-center">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center space-x-3 p-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-semibold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="hidden md:block text-left">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                                            </div>
                                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <svg className="mr-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <svg className="mr-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                            </svg>
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} md:hidden border-t border-gray-200 bg-gray-50`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('archives.index')}
                            active={route().current('archives.*')}
                            className="block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Archives
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('archive-boxes.index')}
                            active={route().current('archive-boxes.*')}
                            className="block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Archive Boxes
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('documents.index')}
                            active={route().current('documents.*')}
                            className="block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Documents
                        </ResponsiveNavLink>
                        
                        {user.isAdmin && (
                            <>
                                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-t border-gray-200 mt-4 pt-4">
                                    Administration
                                </div>
                                <ResponsiveNavLink
                                    href={route('admin.index')}
                                    active={route().current('admin.*')}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Admin Management
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('document-requests.index')}
                                    active={route().current('document-requests.*')}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Document Requests
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('multi-step.step1')}
                                    active={route().current('multi-step.*')}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Multi-Step Setup
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('settings.index')}
                                    active={route().current('settings.*')}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Settings
                                </ResponsiveNavLink>
                                
                                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-t border-gray-200 mt-4 pt-4">
                                    Storage
                                </div>
                                <ResponsiveNavLink
                                    href={route('shelves.index')}
                                    active={route().current('shelves.*')}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Shelves
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('racks.index')}
                                    active={route().current('racks.*')}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Racks
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('columns.index')}
                                    active={route().current('columns.*')}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Columns
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('room-management.index')}
                                    active={route().current('room-management.*')}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Room Management
                                </ResponsiveNavLink>
                                
                                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-t border-gray-200 mt-4 pt-4">
                                    System
                                </div>
                                <ResponsiveNavLink
                                    href={route('box-types.index')}
                                    active={route().current('box-types.*')}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Box Types
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('directions.index')}
                                    active={route().current('directions.*')}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Direction Management
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('storage-availability.index')}
                                    active={route().current('storage-availability.*')}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Storage Availability
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    {/* Mobile User Info */}
                    <div className="border-t border-gray-200 pt-4 pb-3">
                        <div className="px-4 flex items-center">
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500 capitalize">{user.role}</div>
                            </div>
                        </div>
                        <div className="mt-3 px-4 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="block px-3 py-2 rounded-md text-base font-medium">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
