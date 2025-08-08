import { Link } from '@inertiajs/react';

const sections = [
    {
        label: 'Account Management',
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        href: '/profile',
    },
    {
        label: 'Archive Boxes',
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M16 3v4M8 3v4M3 11h18" />
            </svg>
        ),
        href: '/archives',
    },
    {
        label: 'Documents',
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M7 7V3a1 1 0 011-1h8a1 1 0 011 1v4" />
                <rect x="3" y="7" width="18" height="14" rx="2" />
                <path d="M16 13H8" />
            </svg>
        ),
        href: '/documents', // Update this route as needed
    },
    {
        label: 'Storage Availability',
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M16 3v4M8 3v4" />
                <circle cx="12" cy="14" r="3" />
            </svg>
        ),
        href: '/dashboard',
    },
    {
        label: 'Settings',
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09A1.65 1.65 0 008.5 3V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
        ),
        href: '/settings', // Update this route as needed
    },
];

export default function Landing() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-center bg-cover opacity-60"
                style={{
                    backgroundImage: "url('/images/menara-night.jpg')",
                    zIndex: 0,
                }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-60" style={{zIndex: 1}} />
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 drop-shadow-lg">Menara Holding Archive System</h1>
                <div className="flex flex-wrap gap-8 justify-center">
                    {sections.map((section) => (
                        <Link
                            key={section.label}
                            href={section.href}
                            className="flex flex-col items-center justify-center w-32 h-32 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition group"
                        >
                            <span className="text-blue-700 mb-2 group-hover:scale-110 transition">{section.icon}</span>
                            <span className="text-center text-gray-800 font-semibold text-sm mt-2">{section.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}