// src/App.tsx
import React, {useState, useEffect} from "react";
import {Routes, Route, useLocation, Link} from 'react-router-dom';
import HomePage from "./components/pages/HomePage.tsx";
import VectorLesson from './components/lessons/VectorLesson';
import VectorQuiz from "./components/quizzes/VectorQuiz.tsx";
import DotProductLesson from './components/lessons/DotProductLesson';
import DotProductQuiz from "./components/quizzes/DotProductQuiz.tsx";
import GradientLesson from "./components/lessons/GradientLesson.tsx";
import GradientQuiz from "./components/quizzes/GradientQuiz.tsx";
import MatrixLesson from "./components/lessons/MatrixLesson.tsx";
import MatrixQuiz from "./components/quizzes/MatrixQuiz.tsx";
import LinearCombinationLesson from "./components/lessons/LinearCombinationLesson.tsx";
import LinearCombinationQuiz from "./components/quizzes/LinearCombinationQuiz.tsx";
import SpanBasisLesson from "./components/lessons/SpanBasisLesson.tsx";
import SpanBasisQuiz from "./components/quizzes/SpanBasisQuiz.tsx";
import ProgressDashboard from "./components/pages/ProgressDashboard.tsx";
import AuthPage from "./components/pages/AuthPage.tsx";
import RoadmapPage from "./components/pages/RoadmapPage.tsx";
import SettingsPage from "./components/pages/SettingsPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import {useXp} from "./components/context/XpContext.tsx";
import NavBar from "./components/NavBar.tsx";
import {useAuth} from "./components/context/AuthContext.tsx";
import ProjectionLesson from "./components/lessons/ProjectionLesson.tsx";
import ProjectionQuiz from "./components/quizzes/ProjectionQuiz.tsx";

const App: React.FC = () => {
    const {xp} = useXp();
    const { user } = useAuth();
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
                <h1 className="text-xl font-bold">
                    <Link to="/">MLMathr Lessons</Link>
                </h1>
                {user && (<div className="relative">
                    <span className="text-sm bg-yellow-100 px-3 py-1 rounded-full">⭐ XP: {xp}</span>
                    {xpFlash && (
                        <div className="animate-xp-float left-1/2 transform -translate-x-1/2">
                            +{xpFlash - (xpFlash - 25)} XP
                        </div>
                    )}
                </div>)}
            </header>
            <NavBar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/lesson/vectors" element={<PrivateRoute><VectorLesson/></PrivateRoute>}/>
                <Route path="/quiz/vectors" element={<PrivateRoute><VectorQuiz/></PrivateRoute>}/>
                <Route path="/lesson/dot-product" element={<PrivateRoute><DotProductLesson/></PrivateRoute>}/>
                <Route path="/quiz/dot-product" element={<PrivateRoute><DotProductQuiz/></PrivateRoute>}/>
                <Route path="/lesson/gradients" element={<PrivateRoute><GradientLesson/></PrivateRoute>}/>
                <Route path="/quiz/gradient" element={<PrivateRoute><GradientQuiz/></PrivateRoute>}/>
                <Route path="/lesson/matrix" element={<PrivateRoute><MatrixLesson/></PrivateRoute>}/>
                <Route path="/quiz/matrix" element={<PrivateRoute><MatrixQuiz/></PrivateRoute>}/>
                <Route path="/lesson/linear-combinations" element={<PrivateRoute><LinearCombinationLesson/></PrivateRoute>}/>
                <Route path="/quiz/linear-combinations" element={<PrivateRoute><LinearCombinationQuiz/></PrivateRoute>}/>
                <Route path="/lesson/span-basis" element={<PrivateRoute><SpanBasisLesson/></PrivateRoute>}/>
                <Route path="/quiz/span-basis" element={<PrivateRoute><SpanBasisQuiz/></PrivateRoute>}/>
                <Route path="/lesson/projections" element={<PrivateRoute><ProjectionLesson/></PrivateRoute>}/>
                <Route path="/quiz/projections" element={<PrivateRoute><ProjectionQuiz/></PrivateRoute>}/>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path="/progress" element={<PrivateRoute><ProgressDashboard/></PrivateRoute>}/>
                <Route path="/roadmap" element={<PrivateRoute><RoadmapPage/></PrivateRoute>}/>
                <Route path="/settings" element={<PrivateRoute><SettingsPage/></PrivateRoute>}/>
                <Route path="*" element={<p>Choose a lesson to begin 🚀</p>}/>
            </Routes>
        </div>
    );
};

export default App;
