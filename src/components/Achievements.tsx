import React from 'react';

interface Props {
    completedLessons: Set<string>;
    xp: number;
    getQuizScore: (id: string) => number | null;
    quizMeta: Record<string, { total: number }>;
}

const Achievements: React.FC<Props> = ({ completedLessons, xp, getQuizScore, quizMeta }) => {
    const earnedBadges: string[] = [];

    Object.entries(quizMeta).forEach(([id, meta]) => {
        const score = getQuizScore(id);
        if (score === meta.total) {
            const name = id.replace('-quiz', '').replace('-', ' ');
            earnedBadges.push(`🎯 Perfect Score: ${name}`);
        }
    });

    if (
        ['vectors', 'dot-product', 'matrix', 'gradient', 'linear-combinations', 'span-basis'].every((id) => completedLessons.has(id))
    ) {
        earnedBadges.push('📘 All Lessons Completed');
    }

    if (
        ['vectors-quiz', 'dot-product-quiz', 'gradient-quiz', 'matrix-quiz', 'linear-combinations-quiz'].every((id) =>
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
