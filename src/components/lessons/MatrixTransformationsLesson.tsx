import React from 'react';
import MatrixTransformationsVisualizer from './MatrixTransformationsVisualizer.tsx';
import CompleteLessonButton from "./CompleteLessonButton.tsx";
import {lookupXp} from "../../lookupXp.tsx";
import NextUpButton from "../NextUpButton.tsx";

const MatrixTransformationsLesson: React.FC = () => {
    const lessonId = 'matrix-transformations';
    return (
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 p-6">
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
            </div>

            {/* Right: Visualizer + button */}
            <div className="lg:w-1/2 flex flex-col items-center space-y-4">
                <MatrixTransformationsVisualizer />
                <CompleteLessonButton lessonId={lessonId} xpReward={lookupXp(lessonId)} />
                <NextUpButton currentLessonId={lessonId}/>
            </div>
        </div>
    );
};

export default MatrixTransformationsLesson;
