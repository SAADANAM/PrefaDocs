// Alternative Logo Options for PrefaDocs

// Option 1: Modern Document Stack Logo
export function DocumentStackLogo(props) {
    return (
        <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            {/* Bottom Document */}
            <rect x="8" y="32" width="32" height="12" rx="2" fill="currentColor" fillOpacity="0.3"/>
            {/* Middle Document */}
            <rect x="12" y="28" width="32" height="12" rx="2" fill="currentColor" fillOpacity="0.6"/>
            {/* Top Document */}
            <rect x="16" y="24" width="32" height="12" rx="2" fill="currentColor" fillOpacity="0.9"/>
            {/* Document Fold */}
            <path d="M16 24L32 24L32 36L16 36L16 24Z" fill="white"/>
            {/* Document Lines */}
            <rect x="20" y="28" width="20" height="1.5" rx="0.75" fill="currentColor"/>
            <rect x="20" y="31" width="16" height="1.5" rx="0.75" fill="currentColor"/>
            <rect x="20" y="34" width="18" height="1.5" rx="0.75" fill="currentColor"/>
        </svg>
    );
}

// Option 2: Archive Box Logo
export function ArchiveBoxLogo(props) {
    return (
        <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            {/* Main Box */}
            <rect x="8" y="16" width="32" height="24" rx="2" fill="currentColor" fillOpacity="0.9"/>
            {/* Box Lid */}
            <rect x="6" y="14" width="36" height="6" rx="2" fill="currentColor" fillOpacity="0.7"/>
            {/* Box Handle */}
            <rect x="20" y="16" width="8" height="2" rx="1" fill="white"/>
            {/* Document Icons */}
            <rect x="12" y="20" width="8" height="6" rx="1" fill="white"/>
            <rect x="22" y="20" width="8" height="6" rx="1" fill="white"/>
            <rect x="32" y="20" width="4" height="6" rx="1" fill="white"/>
            {/* Document Lines */}
            <rect x="14" y="22" width="4" height="1" rx="0.5" fill="currentColor"/>
            <rect x="14" y="24" width="4" height="1" rx="0.5" fill="currentColor"/>
            <rect x="24" y="22" width="4" height="1" rx="0.5" fill="currentColor"/>
            <rect x="24" y="24" width="4" height="1" rx="0.5" fill="currentColor"/>
        </svg>
    );
}

// Option 3: Minimalist Text Logo
export function TextLogo(props) {
    return (
        <svg {...props} viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg">
            {/* P */}
            <rect x="4" y="4" width="4" height="24" fill="currentColor"/>
            <rect x="4" y="4" width="16" height="4" fill="currentColor"/>
            <rect x="16" y="4" width="4" height="12" fill="currentColor"/>
            <rect x="4" y="12" width="12" height="4" fill="currentColor"/>
            
            {/* r */}
            <rect x="24" y="16" width="4" height="12" fill="currentColor"/>
            <rect x="24" y="16" width="12" height="4" fill="currentColor"/>
            <rect x="32" y="16" width="4" height="8" fill="currentColor"/>
            <rect x="24" y="20" width="8" height="4" fill="currentColor"/>
            
            {/* e */}
            <rect x="40" y="16" width="16" height="4" fill="currentColor"/>
            <rect x="40" y="16" width="4" height="12" fill="currentColor"/>
            <rect x="40" y="24" width="12" height="4" fill="currentColor"/>
            <rect x="48" y="20" width="8" height="4" fill="currentColor"/>
            
            {/* f */}
            <rect x="60" y="16" width="4" height="12" fill="currentColor"/>
            <rect x="56" y="16" width="12" height="4" fill="currentColor"/>
            <rect x="56" y="20" width="8" height="4" fill="currentColor"/>
            
            {/* a */}
            <rect x="72" y="20" width="12" height="4" fill="currentColor"/>
            <rect x="72" y="20" width="4" height="8" fill="currentColor"/>
            <rect x="72" y="24" width="12" height="4" fill="currentColor"/>
            <rect x="80" y="16" width="4" height="8" fill="currentColor"/>
            <rect x="76" y="16" width="8" height="4" fill="currentColor"/>
            
            {/* D */}
            <rect x="88" y="4" width="4" height="24" fill="currentColor"/>
            <rect x="88" y="4" width="16" height="4" fill="currentColor"/>
            <rect x="88" y="24" width="16" height="4" fill="currentColor"/>
            <rect x="100" y="8" width="4" height="16" fill="currentColor"/>
            
            {/* o */}
            <rect x="108" y="20" width="12" height="4" fill="currentColor"/>
            <rect x="108" y="20" width="4" height="8" fill="currentColor"/>
            <rect x="108" y="24" width="12" height="4" fill="currentColor"/>
            <rect x="116" y="20" width="4" height="8" fill="currentColor"/>
            
            {/* c */}
            <rect x="124" y="20" width="12" height="4" fill="currentColor"/>
            <rect x="124" y="20" width="4" height="8" fill="currentColor"/>
            <rect x="124" y="24" width="12" height="4" fill="currentColor"/>
            
            {/* s */}
            <rect x="140" y="20" width="12" height="4" fill="currentColor"/>
            <rect x="140" y="20" width="4" height="4" fill="currentColor"/>
            <rect x="140" y="24" width="12" height="4" fill="currentColor"/>
            <rect x="148" y="24" width="4" height="4" fill="currentColor"/>
            <rect x="144" y="20" width="4" height="4" fill="currentColor"/>
        </svg>
    );
}

// Option 4: Folder with Documents Logo
export function FolderLogo(props) {
    return (
        <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            {/* Folder */}
            <path d="M6 12C6 10.9 6.9 10 8 10H20L24 6H40C41.1 6 42 6.9 42 8V36C42 37.1 41.1 38 40 38H8C6.9 38 6 37.1 6 36V12Z" 
                  fill="currentColor" 
                  fillOpacity="0.9"/>
            
            {/* Documents inside */}
            <rect x="12" y="18" width="20" height="8" rx="1" fill="white"/>
            <rect x="12" y="28" width="16" height="6" rx="1" fill="white"/>
            <rect x="12" y="36" width="18" height="4" rx="1" fill="white"/>
            
            {/* Document lines */}
            <rect x="14" y="20" width="16" height="1" rx="0.5" fill="currentColor"/>
            <rect x="14" y="22" width="12" height="1" rx="0.5" fill="currentColor"/>
            <rect x="14" y="30" width="12" height="1" rx="0.5" fill="currentColor"/>
            <rect x="14" y="32" width="14" height="1" rx="0.5" fill="currentColor"/>
        </svg>
    );
}
