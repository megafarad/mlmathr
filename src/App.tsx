// src/App.tsx
import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import VectorLesson from './components/lessons/VectorLesson';
import VectorQuiz from "./components/quizzes/VectorQuiz.tsx";
import DotProductLesson from './components/lessons/DotProductLesson';
import DotProductQuiz from "./components/quizzes/DotProductQuiz.tsx";
import GradientLesson from "./components/lessons/GradientLesson.tsx";
import GradientQuiz from "./components/quizzes/GradientQuiz.tsx";
import MatrixLesson from "./components/lessons/MatrixLesson.tsx";
import MatrixQuiz from "./components/quizzes/MatrixQuiz.tsx";
import ProgressDashboard from "./components/pages/ProgressDashboard.tsx";
import RoadmapPage from "./components/pages/RoadmapPage.tsx";
import SettingsPage from "./components/pages/SettingsPage.tsx";
import { useXp } from "./components/context/XpContext.tsx";

const App: React.FC = () => {
    const { xp, isUnlocked } = useXp();
    const [xpFlash, setXpFlash] = useState<number | null>(null);

    const location = useLocation();

    useEffect(() => {
        // Save route if it's a lesson or quiz
        if (location.pathname.startsWith('/lesson') || location.pathname.startsWith('/quiz')) {
            localStorage.setItem('lastVisited', location.pathname);
        }
    }, [location]);

    useEffect(() => {
        if (xp > 0) {
            setXpFlash(xp);
            const timeout = setTimeout(() => setXpFlash(null), 1000);
            return () => clearTimeout(timeout);
        }
    }, [xp]);


    return (
        <div className="p-6">
            <header className="relative flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">MLMathr Lessons</h1>
                <div className="relative">
                    <span className="text-sm bg-yellow-100 px-3 py-1 rounded-full">⭐ XP: {xp}</span>
                    {xpFlash && (
                        <div className="animate-xp-float left-1/2 transform -translate-x-1/2">
                            +{xpFlash - (xpFlash - 25)} XP
                        </div>
                    )}
                </div>
            </header>
            <nav className="mb-6 flex gap-4">
                <Link to="/lesson/vectors" className="text-blue-600 hover:underline">Vectors</Link>
                {isUnlocked('vectors-quiz') ? (
                    <Link to="/quiz/vectors" className="text-indigo-600 hover:underline">Quiz: Vectors</Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed" title="Complete 'Vectors' to unlock">
                        🔒 Quiz: Vectors
                    </span>
                ) }
                {isUnlocked('dot-product') ? (
                    <Link to="/lesson/dot-product" className="text-green-600 hover:underline">Dot Product</Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed" title="Complete 'Quiz: Vectors' to unlock">
                        🔒 Dot Product
                    </span>
                )}
                {isUnlocked('dot-product-quiz') ? (
                    <Link to="/quiz/dot-product" className="text-indigo-600 hover:underline">
                        Quiz: Dot Product
                    </Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed" title="Complete 'Dot Product' to unlock">🔒 Quiz: Dot Product</span>
                )}
                {isUnlocked('gradient') ? (
                    <Link to="/lesson/gradients" className="text-green-600 hover:underline">
                        Gradient
                    </Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed" title="Complete 'Dot Product Quiz' to unlock">🔒 Gradient</span>
                )
                }
                {isUnlocked('gradient-quiz') ? (
                    <Link to="/quiz/gradient" className="text-indigo-600 hover:underline">
                        Quiz: Gradient
                    </Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed" title="Complete 'Gradient' to unlock">🔒 Quiz: Gradient</span>
                )}
                {isUnlocked('matrix') ? (
                    <Link to="/lesson/matrix" className="text-green-600 hover:underline">
                        Matrix Multiplication
                    </Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed" title="Complete 'Gradient Quiz' to unlock">🔒 Matrix Multiplication</span>
                )}
                {isUnlocked('matrix-quiz') ? (
                    <Link to="/quiz/matrix" className="text-indigo-600 hover:underline">
                        Quiz: Matrix Multiplication
                    </Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed">🔒 Quiz: Matrix</span>
                )}

                <Link to="/progress" className="text-purple-600 hover:underline">Progress</Link>
                <Link to="/roadmap" className="text-purple-600 hover:underline">🗺️ Roadmap</Link>
                <Link to="/settings" className="text-gray-600 hover:underline">⚙️ Settings</Link>
            </nav>
            <Routes>
                <Route path="/lesson/vectors" element={<VectorLesson />} />
                <Route path="/quiz/vectors" element={<VectorQuiz />} />
                <Route path="/lesson/dot-product" element={<DotProductLesson />} />
                <Route path="/quiz/dot-product" element={<DotProductQuiz />} />
                <Route path="/lesson/gradients" element={<GradientLesson/>} />
                <Route path="/quiz/gradient" element={<GradientQuiz />} />
                <Route path="/lesson/matrix" element={<MatrixLesson />} />
                <Route path="/quiz/matrix" element={<MatrixQuiz />} />
                <Route path="/progress" element={<ProgressDashboard />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/settings" element={<SettingsPage/>} />
                <Route path="*" element={<p>Choose a lesson to begin 🚀</p>} />
            </Routes>
        </div>
    );
};

export default App;
