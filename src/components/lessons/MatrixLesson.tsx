import React from 'react';
import MatrixVisualizer from './MatrixVisualizer';
import { useXp } from '../context/XpContext';

const MatrixLesson: React.FC = () => {
    const { addXpForLesson, hasCompleted } = useXp();
    const isCompleted = hasCompleted('matrix');

    return (
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 p-6">
            {/* Left: Explanation */}
            <div className="lg:w-1/2 space-y-4">
                <h2 className="text-xl font-semibold">Lesson 4: Matrix Multiplication</h2>

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
                <MatrixVisualizer />

                <button
                    onClick={() => addXpForLesson('matrix', 25)}
                    disabled={isCompleted}
                    className={`px-4 py-2 rounded ${
                        isCompleted
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    {isCompleted ? '✅ Lesson Completed' : 'Complete Lesson (+25 XP)'}
                </button>
            </div>
        </div>
    );
};

export default MatrixLesson;
