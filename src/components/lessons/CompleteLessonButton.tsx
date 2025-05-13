import React from 'react';
import { useXp } from '../context/XpContext';

interface Props {
    lessonId: string;
    xpReward: number;
}

const CompleteLessonButton: React.FC<Props> = ({ lessonId, xpReward }) => {
    const { hasCompleted, addXpForLesson } = useXp();
    
    const isCompleted = hasCompleted(lessonId)

    return (
        <div className="mt-6 flex justify-center">
            <button
                onClick={() => addXpForLesson(lessonId, xpReward)}
                disabled={isCompleted}
                className={`px-4 py-2 rounded ${
                    isCompleted
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
                {isCompleted ? '✅ Lesson Completed' : `Complete Lesson (${xpReward} XP)`}
            </button>
        </div>
    );
};

export default CompleteLessonButton;
