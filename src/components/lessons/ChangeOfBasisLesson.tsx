import React, { useState } from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import ChangeOfBasisVisualizer from "./ChangeOfBasisVisualizer";
import NextUpButton from "../NextUpButton.tsx";
import Confetti from 'react-confetti';

const lessonId = 'change-of-basis';

const ChangeOfBasisLesson: React.FC = () => {
    const [goalAchieved, setGoalAchieved] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-6 relative">
            {goalAchieved && <Confetti numberOfPieces={200} recycle={false} />}
            <h1 className="text-2xl font-bold mb-4">🔄 Change of Basis</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        Most of the time, we describe vectors using the standard basis: the usual X and Y axes. But what if we wanted to describe a vector using a different set of axes?
                    </p>

                    <p>
                        A <strong>basis</strong> is a set of independent vectors that define a coordinate system. When you <em>change basis</em>, you’re describing the same vector in a new coordinate system.
                    </p>

                    <p>
                        This is incredibly useful in linear algebra and machine learning. For example, Principal Component Analysis (PCA) is essentially a change of basis—into a system that better aligns with your data's structure.
                    </p>

                    <p>
                        To move between bases, we use a <strong>change of basis matrix</strong>. This matrix transforms coordinates from one system to another.
                    </p>

                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
  A · [a, b] = v
</pre>

                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
  [a, b] = A⁻¹ · v
</pre>

                    <p>
                        Try adjusting the basis matrix so the coordinates of <code>(2, 1)</code> in the new basis become <strong>[1, 0]</strong>!
                    </p>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <ChangeOfBasisVisualizer onGoalAchieved={() => setGoalAchieved(true)} />
                    {!goalAchieved && (
                        <p className="text-sm text-gray-600">
                            🎯 Set the basis so <code>(2, 1)</code> becomes <strong>[1, 0]</strong> in the new basis
                        </p>
                    )}
                    {goalAchieved && <CompleteLessonButton lessonId={lessonId} />}
                    <NextUpButton currentLessonId={lessonId} />
                </div>
            </div>
        </div>
    );
};

export default ChangeOfBasisLesson;
