import { Link } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.tsx";
import React from "react";
import Meta from "../Meta.tsx";

const HomePage: React.FC = () => {
    const { user } = useAuth();

    return (
        <>
            <Meta title="Learn Math for ML – MLMathr" description="Gamified visual lessons for vectors, dot product, and more." image="/public/logo.png" />
            <div className="p-6 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">
                    🚀 Master Math for Machine Learning
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                    MLMathr is a gamified learning platform to help you build the math foundation for machine learning—with interactive lessons and quizzes on vectors, matrices, gradients, and more.
                </p>

                {user ? (
                    <Link to="/progress" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
                        🎯 Go to Dashboard
                    </Link>
                ) : (
                    <div className="space-x-4">
                        <Link to="/auth" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                            🔐 Log In / Sign Up
                        </Link>
                        <Link to="/lesson/vectors" className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50">
                            🧪 Try a Lesson
                        </Link>
                    </div>
                )}

                <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
                    <div>
                        <h2 className="text-xl font-semibold">📘 Visual Lessons</h2>
                        <p className="text-gray-600">Drag vectors, explore gradients, and build matrix intuition with interactive graphs.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">🎮 Gamified Learning</h2>
                        <p className="text-gray-600">Earn XP and badges as you master each concept, quiz, and challenge.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">🧠 ML-Focused Topics</h2>
                        <p className="text-gray-600">Learn exactly the math you need for machine learning—from dot products to eigenvalues.</p>
                    </div>
                </div>

                <footer className="mt-16 text-sm text-gray-400">
                    Built with ❤️ for self-learners. | <a href="https://github.com/megafarad/mlmathr" className="underline">GitHub</a>
                </footer>
            </div>
        </>
    );
};

export default HomePage;
