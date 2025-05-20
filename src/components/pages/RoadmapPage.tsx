import React from 'react';
import { Link } from 'react-router-dom';
import { useXp } from "../context/XpContext.tsx";
import {modules} from "../../modules.tsx";


const RoadmapPage: React.FC = () => {
    const { hasCompleted, isUnlocked, getNeededPrerequisites } = useXp();

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">🗺️ Lesson Roadmap</h2>

            <ul className="space-y-3">
                {modules.map((mod, modIndex) => (
                    <div key={mod.title} className="mb-8 pl-6 relative">
                        <h3 className="text-lg font-semibold mb-2">📘 {mod.title}</h3>

                        <div className="space-y-4">
                            {mod.items.map(({ id, title, path }, itemIndex) => {
                                const unlocked = isUnlocked(id);
                                const completed = hasCompleted(id);
                                const neededPrerequisites = getNeededPrerequisites(id);
                                const lockMessage = `🔒 Complete the following to unlock: ${neededPrerequisites.map(item => item.title).join(", ")}`;
                                return (
                                    <div key={id} className="relative pl-6">
                                        <div className="absolute -left-3.5 top-2 w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                                            {modIndex + 1}.{itemIndex + 1}
                                        </div>

                                        <div className="ml-2 p-3 bg-gray-100 rounded flex justify-between items-center">
                                            <div>
                                                <div className="font-medium">{title}</div>
                                                {!unlocked && (
                                                    <div className="text-sm text-gray-500 italic">{lockMessage}</div>
                                                )}
                                            </div>
                                            <div>
                                                {unlocked ? (
                                                    <Link to={path} className="text-blue-600 hover:underline">
                                                        {completed ? '✅ View' : '➡️ Start'}
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-400">🔒 Locked</span>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default RoadmapPage;
