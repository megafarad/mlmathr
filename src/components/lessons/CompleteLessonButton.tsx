import React from 'react';
import { useXp } from '../context/XpContext';
import {lookupXp} from "../../lookupXp.tsx";

interface Props {
    lessonId: string;
}

const CompleteLessonButton: React.FC<Props> = ({ lessonId }) => {
    const { hasCompleted, addXpForLesson } = useXp();
    
    const isCompleted = hasCompleted(lessonId)
    const xpReward = lookupXp(lessonId);

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
