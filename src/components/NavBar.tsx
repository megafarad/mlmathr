import React, {useState} from "react";
import {useAuth} from "./context/AuthContext.tsx";
import {Link} from "react-router-dom";
import ModuleAccordionMenu from "./ModuleAccordionMenu.tsx";

const NavBar: React.FC = () => {
    const {user, logout} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <header className="mb-6 shadow-sm">
            <div className="flex justify-between items-center px-4 py-2 md:px-6">
                <button
                    className="md:hidden p-2"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                >
                    <div className="w-6 h-6 relative">
                        <span
                            className={`block absolute h-0.5 w-full bg-black transform transition duration-300 ease-in-out ${
                                menuOpen ? 'rotate-45 top-2.5' : 'top-1'
                            }`}
                        />
                        <span
                            className={`block absolute h-0.5 w-full bg-black transform transition duration-300 ease-in-out ${
                                menuOpen ? 'opacity-0' : 'top-2.5'
                            }`}
                        />
                        <span
                            className={`block absolute h-0.5 w-full bg-black transform transition duration-300 ease-in-out ${
                                menuOpen ? '-rotate-45 bottom-2.5' : 'bottom-1'
                            }`}
                        />
                    </div>
                </button>
            </div>

            <nav
                className={`flex-col md:flex-row md:flex gap-4 px-4 md:px-6 ${menuOpen ? 'flex' : 'hidden'} md:items-center`}>
                {user ? (
                    <>
                        <ModuleAccordionMenu/>
                        <Link to="/progress" className="text-purple-600 hover:underline">📊 Dashboard</Link>
                        <Link to="/roadmap" className="text-purple-600 hover:underline">🗺️ Roadmap</Link>
                        <Link to="/settings" className="text-gray-600 hover:underline">⚙️ Settings</Link>
                        <button onClick={logout} className="text-red-600 hover:underline text-left px-2 py-1">
                            🚪 Log Out
                        </button>

                    </>
                ) : (
                    <Link to="/auth" className="text-blue-600 hover:underline">
                        🔐 Log In / Sign Up
                    </Link>
                )}
            </nav>
        </header>
    )
}

export default NavBar;