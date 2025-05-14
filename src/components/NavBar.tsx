import React, {useState} from "react";
import NavDropdown from "./NavDropdown.tsx";
import {useXp} from "./context/XpContext.tsx";
import {useAuth} from "./context/AuthContext.tsx";
import {Link} from "react-router-dom";

const lessonItems = [
    {id: 'vectors', label: 'Vectors', to: '/lesson/vectors'},
    {id: 'dot-product', label: 'Dot Product', to: '/lesson/dot-product'},
    {id: 'gradient', label: 'Gradient', to: '/lesson/gradients'},
    {id: 'matrix', label: 'Matrix Multiplication', to: '/lesson/matrix'},
    {id: 'linear-combinations', label: 'Linear Combinations', to: '/lesson/linear-combinations'},
    {id: 'span-basis', label: 'Span and Basis', to: '/lesson/span-basis'},
    {id: 'projections', label: 'Vector Projections', to: '/lesson/projections'},
];

const quizItems = [
    {id: 'vectors-quiz', label: 'Vectors Quiz', to: '/quiz/vectors'},
    {id: 'dot-product-quiz', label: 'Dot Product Quiz', to: '/quiz/dot-product'},
    {id: 'gradient-quiz', label: 'Gradient Quiz', to: '/quiz/gradient'},
    {id: 'matrix-quiz', label: 'Matrix Multiplication Quiz', to: '/quiz/matrix'},
    {id: 'linear-combinations-quiz', label: 'Linear Combo Quiz', to: '/quiz/linear-combinations'},
    {id: 'span-basis quiz', label: 'Span and Basis Quiz', to: '/quiz/span-basis'},
    {id: 'projections-quiz', label: 'Vector Projections Quiz', to: '/quiz/projections'},
];

const NavBar: React.FC = () => {

    const {isUnlocked} = useXp();
    const {user, logout} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const allItems = [...lessonItems, ...quizItems];
    const lockedIds = new Set(allItems.filter(({id}) => !isUnlocked(id)).map(({id}) => id));


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
                        <NavDropdown label="📘 Lessons" items={lessonItems} lockedIds={lockedIds}/>
                        <NavDropdown label="🧪 Quizzes" items={quizItems} lockedIds={lockedIds}/>
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