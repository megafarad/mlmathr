// src/App.tsx
import React, {useState, useEffect} from "react";
import {Routes, Route, useLocation, Link} from 'react-router-dom';
import NavBar from "./components/NavBar.tsx";
import HomePage from "./components/pages/HomePage.tsx";
import ProgressDashboard from "./components/pages/ProgressDashboard.tsx";
import AuthPage from "./components/pages/AuthPage.tsx";
import RoadmapPage from "./components/pages/RoadmapPage.tsx";
import SettingsPage from "./components/pages/SettingsPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import {useXp} from "./components/context/XpContext.tsx";
import {useAuth} from "./components/context/AuthContext.tsx";
import {modules} from "./modules";
import ModuleItemPage from "./components/pages/ModuleItemPage.tsx";
import ExplorePage from "./components/pages/ExplorePage.tsx";
import ResetPasswordPage from "./components/pages/ResetPasswordPage.tsx";
import GoogleAnalytics from "./components/GoogleAnalytics.tsx";

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
        <>
            {import.meta.env.VITE_GA_ID && <GoogleAnalytics/>}
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
                    {modules.flatMap(m => m.items).map(item => (
                        <Route key={item.id} path={item.path} element={<ModuleItemPage item={item}/>}/>
                    ))}
                    <Route path="/explore" element={<ExplorePage/>} />
                    <Route path="/auth" element={<AuthPage/>}/>
                    <Route path='/reset-password' element={<ResetPasswordPage/>}/>
                    <Route path="/progress" element={<PrivateRoute><ProgressDashboard/></PrivateRoute>}/>
                    <Route path="/roadmap" element={<PrivateRoute><RoadmapPage/></PrivateRoute>}/>
                    <Route path="/settings" element={<PrivateRoute><SettingsPage/></PrivateRoute>}/>
                    <Route path="*" element={<p>Choose a lesson to begin 🚀</p>}/>
                </Routes>
            </div>
        </>
    );
};

export default App;
