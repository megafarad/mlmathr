import React, { useState } from 'react';
import MatrixTransformationsVisualizer from './MatrixTransformationsVisualizer.tsx';
import CompleteLessonButton from "./CompleteLessonButton.tsx";
import NextUpButton from "../NextUpButton.tsx";
import Confetti from 'react-confetti';

const MatrixTransformationsLesson: React.FC = () => {
    const lessonId = 'matrix-transformations';
    const [goalAchieved, setGoalAchieved] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 p-6 relative">
            {goalAchieved && <Confetti numberOfPieces={200} recycle={false} />}
            {/* Left: Explanation */}
            <div className="lg:w-1/2 space-y-4">
                <h2 className="text-xl font-semibold">Matrix Transformations</h2>

                <p>
                    In this lesson, you'll learn how matrices can transform vectors.
                    When we multiply a matrix by a vector, we're essentially applying a linear transformation.
                </p>

                <p>
                    For example, multiplying a 2×2 matrix by a 2D vector can rotate, scale, or skew the vector.
                </p>

                <p>
                    You can drag the original vector (blue) around the grid, and adjust the 2×2 matrix values below.
                    The transformed vector (green) will update in real time.
                </p>

                <p>
                    Matrix × Vector:
                    <br />
                    <code>
                        [[a, b],<br />
                        &nbsp;[c, d]] × [x, y] = [ax + by, cx + dy]
                    </code>
                </p>

                <p>
                    Try applying a matrix that transforms <code>(1, 1)</code> into <strong>(3, 2)</strong>.
                </p>
            </div>

            {/* Right: Visualizer + button */}
            <div className="lg:w-1/2 flex flex-col items-center space-y-4">
                <MatrixTransformationsVisualizer onGoalAchieved={() => setGoalAchieved(true)} />
                {!goalAchieved && (
                    <p className="text-sm text-gray-600">
                        🎯 Try applying a matrix that transforms <strong>(1, 1)</strong> into <strong>(3, 2)</strong>
                    </p>
                )}
                {goalAchieved && <CompleteLessonButton lessonId={lessonId} />}
                <NextUpButton currentLessonId={lessonId}/>
            </div>
        </div>
    );
};

export default MatrixTransformationsLesson;
