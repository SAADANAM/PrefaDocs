export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Document/File Icon */}
            <path d="M12 4C10.9 4 10 4.9 10 6V42C10 43.1 10.9 44 12 44H36C37.1 44 38 43.1 38 42V16L26 4H12Z" 
                  fill="currentColor" 
                  fillOpacity="0.9"/>
            
            {/* Document Fold */}
            <path d="M26 4V16H38L26 4Z" 
                  fill="currentColor" 
                  fillOpacity="0.7"/>
            
            {/* Document Lines */}
            <rect x="16" y="24" width="16" height="2" rx="1" fill="white"/>
            <rect x="16" y="28" width="12" height="2" rx="1" fill="white"/>
            <rect x="16" y="32" width="14" height="2" rx="1" fill="white"/>
            
            {/* Archive Box Icon */}
            <rect x="20" y="36" width="8" height="4" rx="1" fill="white"/>
            <rect x="22" y="38" width="4" height="2" rx="0.5" fill="currentColor"/>
        </svg>
    );
}
