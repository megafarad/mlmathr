import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface NavDropdownProps {
    label: string;
    items: { label: string; to: string; id: string }[];
    lockedIds?: Set<string>;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ label, items, lockedIds = new Set() }) => {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(true);
    };

    const handleLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150);
    };

    return (
        <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <button
                className="px-4 py-2 hover:bg-gray-100 rounded"
                onClick={() => setOpen((prev) => !prev)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpen((prev) => !prev);
                    }
                }}
                aria-haspopup="true"
                aria-expanded={open}
                tabIndex={0}
            >
                {label} ▼
            </button>
            {open && (
                <div
                    className="absolute bg-white shadow-md rounded z-10 mt-1 w-48 text-left
               animate-fade-slide"
                >
                    {items.map(({ label, to, id }) => {
                        const isLocked = lockedIds.has(id);
                        return isLocked ? (
                            <div
                                key={id}
                                className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed text-sm"
                            >
                                🔒 {label}
                            </div>
                        ) : (
                            <Link
                                key={id}
                                to={to}
                                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default NavDropdown;
