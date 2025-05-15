import React from 'react';
import {lessonIds, quizIds, quizzes} from "../modules";

interface Props {
    completedLessons: Set<string>;
    xp: number;
    getQuizScore: (id: string) => number | null;
}

const Achievements: React.FC<Props> = ({ completedLessons, xp, getQuizScore}) => {
    const earnedBadges: string[] = [];

    quizzes.forEach(quiz => {
       const score = getQuizScore(quiz.id);
       if (score === quiz.meta?.total) {
           earnedBadges.push(`🎯 Perfect Score: ${quiz.listing}`)
       }
    });

    if (
        lessonIds.every((id) => completedLessons.has(id))
    ) {
        earnedBadges.push('📘 All Lessons Completed');
    }

    if (
        quizIds.every((id) =>
            completedLessons.has(id)
        )
    ) {
        earnedBadges.push('🧠 All Quizzes Completed');
    }

    if (xp >= 100) {
        earnedBadges.push('🌟 100 XP Earned');
    }

    if (earnedBadges.length === 0) return null;

    const badgeStyle = (badge: string) => {
        if (badge.includes('Perfect Score')) return 'bg-green-100 text-green-800';
        if (badge.includes('All Lessons')) return 'bg-blue-100 text-blue-800';
        if (badge.includes('XP')) return 'bg-purple-100 text-purple-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">🏅 Achievements</h3>
            <div className="flex flex-wrap gap-2">
                {earnedBadges.map((badge) => (
                    <div
                        key={badge}
                        className={`font-medium px-3 py-1 rounded-full shadow-sm text-sm ${badgeStyle(badge)}`}
                    >
                        {badge}
                    </div>

                ))}
            </div>
        </div>
    );

};

export default Achievements;
