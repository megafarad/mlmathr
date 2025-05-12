import React from 'react';
import {Link} from "react-router-dom";
import { useXp } from '../context/XpContext';

const lessons = [
    { id: 'vectors', title: 'Vectors', xp: 25 },
    { id: 'vectors-quiz', title: 'Vectors Quiz', xp: 15 },
    { id: 'dot-product', title: 'Dot Product', xp: 25 },
    { id: 'dot-product-quiz', title: 'Dot Product Quiz', xp: 20 },
    { id: 'gradient', title: 'Gradient', xp: 25 },
    { id: 'gradient-quiz', title: 'Gradients Quiz', xp: 20 },
];

const totalPossibleXp = lessons.reduce((sum, lesson) => sum + lesson.xp, 0);

type QuizMeta = {
    [key: string]: { total: number }
};

const quizMeta: QuizMeta = {
    'vectors-quiz': { total: 2 },
    'dot-product-quiz': { total: 3 },
    'gradient-quiz': { total: 3 },
};

const getQuizScore = (id: string) => {
    const raw = localStorage.getItem(`quiz:${id}`);

    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        return typeof parsed.score === 'number' ? parsed.score : null;
    } catch {
        return null;
    }
};


const ProgressDashboard: React.FC = () => {
    const { xp, completedLessons } = useXp();
    const progressPercent = Math.round((xp / totalPossibleXp) * 100);
    const lastVisited = localStorage.getItem('lastVisited');
    const earnedBadges: string[] = [];

    Object.entries(quizMeta).forEach(([id, meta]) => {
        const score = getQuizScore(id);

        if (score === meta.total) {
            const name = id.replace('-quiz', '').replace('-', ' ');
            earnedBadges.push(`🎯 Perfect Score: ${name}`);
        }
    });

    if (
        ['vectors', 'dot-product', 'gradient'].every((id) => completedLessons.has(id))
    ) {
        earnedBadges.push('📘 All Lessons Completed');
    }

    if (
        ['vectors-quiz', 'dot-product-quiz', 'gradient-quiz'].every((id) =>
            completedLessons.has(id)
        )
    ) {
        earnedBadges.push('🧠 All Quizzes Completed');
    }

    if (xp >= 100) {
        earnedBadges.push('🌟 100 XP Earned');
    }


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
            {earnedBadges.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">🏅 Achievements</h3>
                    <ul className="space-y-1 list-disc list-inside">
                        {earnedBadges.map((badge) => (
                            <li key={badge}>{badge}</li>
                        ))}
                    </ul>
                </div>
            )}
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
