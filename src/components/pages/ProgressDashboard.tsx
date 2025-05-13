import React from 'react';
import {Link} from "react-router-dom";
import { useXp } from '../context/XpContext';
import Achievements from "../Achievements.tsx";

const lessons = [
    { id: 'vectors', title: 'Vectors', xp: 25 },
    { id: 'vectors-quiz', title: 'Vectors Quiz', xp: 15 },
    { id: 'dot-product', title: 'Dot Product', xp: 25 },
    { id: 'dot-product-quiz', title: 'Dot Product Quiz', xp: 20 },
    { id: 'gradient', title: 'Gradient', xp: 25 },
    { id: 'gradient-quiz', title: 'Gradients Quiz', xp: 20 },
    { id: 'matrix', title: 'Matrix Multiplication', xp: 25 },
    { id: 'matrix-quiz', title: 'Quiz: Matrix Multiplication', xp: 20 },
    { id: 'linear-combinations', title: 'Linear Combinations', xp: 10 },
    { id: 'linear-combinations-quiz', title: 'Quiz: Linear Combinations', xp: 10 },
];

const totalPossibleXp = lessons.reduce((sum, lesson) => sum + lesson.xp, 0);

type QuizMeta = {
    [key: string]: { total: number }
};

const quizMeta: QuizMeta = {
    'vectors-quiz': { total: 2 },
    'dot-product-quiz': { total: 3 },
    'gradient-quiz': { total: 3 },
    'matrix-quiz': { total: 3 },
    'linear-combinations': { total: 3 },
};
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
                quizMeta={quizMeta}
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
                {lessons.map(({ id, title, xp }) => {
                    const completed = completedLessons.has(id);
                    const score = id.includes('quiz') ? getQuizScore(id) : null;
                    const total = quizMeta[id]?.total;

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
