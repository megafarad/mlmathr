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

    if (earnedBadges.length === 0) return null;

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">🏅 Achievements</h3>
            <ul className="space-y-1 list-disc list-inside">
                {earnedBadges.map((badge) => (
                    <li key={badge}>{badge}</li>
                ))}
            </ul>
        </div>
    );
};

export default Achievements;
