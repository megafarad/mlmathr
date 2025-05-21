import React, { useState } from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import DeterminantsVisualizer from './DeterminantsVisualizer';
import NextUpButton from '../NextUpButton.tsx';
import Confetti from 'react-confetti';

const lessonId = 'determinants';

const DeterminantsLesson: React.FC = () => {
    const [goalAchieved, setGoalAchieved] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-6 relative">
            {goalAchieved && <Confetti numberOfPieces={200} recycle={false} />}
            <h1 className="text-2xl font-bold mb-4">📐 Determinants and Area</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        When you apply a matrix to the unit square, it transforms into a parallelogram.
                        The <strong>area</strong> of that parallelogram is called the matrix’s <strong>determinant</strong>.
                    </p>
                    <p>
                        If the determinant is:
                        <ul className="list-disc list-inside ml-4">
                            <li>1 → the area is unchanged</li>
                            <li>0 → the square collapsed into a line or point</li>
                            <li>Negative → the shape was flipped (orientation reversed)</li>
                        </ul>
                    </p>
                    <p>
                        🎯 Try adjusting the matrix so the determinant becomes <strong>0</strong>
                    </p>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <DeterminantsVisualizer onGoalAchieved={() => setGoalAchieved(true)} />
                    {!goalAchieved && (
                        <p className="text-sm text-gray-600">
                            🎯 Adjust the matrix until the determinant equals <strong>0</strong>
                        </p>
                    )}
                    {goalAchieved && <CompleteLessonButton lessonId={lessonId} />}
                    <NextUpButton currentLessonId={lessonId} />
                </div>
            </div>
        </div>
    );
};

export default DeterminantsLesson;
