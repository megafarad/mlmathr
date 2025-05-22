import React from 'react';
import {Link} from "react-router-dom";
import { useXp } from '../context/XpContext';
import Achievements from "../Achievements.tsx";
import {allItems, quizzes} from "../../modules.tsx";

const totalPossibleXp = allItems.reduce((sum, item) => sum + item.xp, 0);

const ProgressDashboard: React.FC = () => {
    const { xp, completedLessons, getQuizScore } = useXp();
    const progressPercent = Math.round((xp / totalPossibleXp) * 100);
    const lastVisited = localStorage.getItem('lastVisited');

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">📊 Your Progress</h2>
            <div>
                <div className="text-sm mb-1 text-gray-600">Overall Progress: {progressPercent}%</div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
            <p className="text-lg">⭐ Total XP: {xp}</p>
            <Achievements
                completedLessons={completedLessons}
                xp={xp}
                getQuizScore={getQuizScore}
            />
            {lastVisited && (
                <div className="mt-4">
                    <Link
                        to={lastVisited}
                        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        ▶️ Resume Last Lesson
                    </Link>
                </div>
            )}

            <ul className="mt-4 space-y-3">
                {allItems.map(({ id, title, xp }) => {
                    const completed = completedLessons.has(id);
                    const score = id.includes('quiz') ? getQuizScore(id) : null;
                    const total = quizzes.find(quiz => quiz.id === id)?.numberOfQuestions;

                    return (
                        <li key={id} className="flex justify-between items-center p-3 bg-gray-100 rounded">
                            <div>
                                <span>{title}</span>
                                <div className="text-sm text-gray-500">
                                    {xp} XP
                                    {score !== null && total && ` — Score: ${score}/${total}`}
                                </div>
                            </div>
                            <span className={completed ? 'text-green-600' : 'text-gray-400'}>
        {completed ? '✅ Completed' : '🔒 Incomplete'}
      </span>
                        </li>
                    );
                })}

            </ul>
        </div>
    );
};

export default ProgressDashboard;
