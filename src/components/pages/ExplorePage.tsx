import React from 'react';
import {modules} from '../../modules';
import {useXp} from "../context/XpContext.tsx";
import {Link} from "react-router-dom";

const ExplorePage: React.FC = () => {
    const { isUnlocked, hasCompleted } = useXp();

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">📘 Explore MLMathr</h1>
            <p className="text-center mb-10 text-gray-600 max-w-2xl mx-auto">
                MLMathr covers core math topics that power machine learning. Each module contains interactive lessons
                and quizzes to help you understand and apply math concepts visually. Sign up or log in to get started!
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {modules.map((module, index) => (
                    <div key={index} className="border rounded-lg shadow-md p-5 bg-white">
                        <h2 className="text-xl font-semibold">{module.title}</h2>
                        <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                        <ul className="space-y-2">
                            {module.items.map((item) => (
                                <li key={item.id} className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span>
                                            {item.type === 'lesson' ? '📘' : '🧪'} {item.title}
                                        </span>
                                        {
                                            isUnlocked(item.id) ? (
                                                <Link to={item.path} className="text-blue-600 hover:underline">
                                                    {hasCompleted(item.id) ? '✅ View' : '➡️ Start'}
                                                </Link>
                                            ) : (
                                                <span className="text-gray-400">🔒 Locked</span>
                                            )
                                        }
                                    </div>
                                    <p className="text-sm text-gray-500 ml-5">{item.description}</p>
                                </li>
                            ))}

                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExplorePage;
