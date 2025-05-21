import React from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import MatrixRankVisualizer from "./MatrixRankVisualizer.tsx";
import NextUpButton from "../NextUpButton.tsx";

const lessonId = 'matrix-rank';

const MatrixRankLesson: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">📐 Matrix Rank</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        The <strong>rank</strong> of a matrix tells you how much independent information its rows or columns contain. It reflects the number of linearly independent vectors that make up the matrix.
                    </p>

                    <p>
                        For a <strong>2×2 matrix</strong>, you can compute the rank by looking at its two column vectors:
                    </p>

                    <ul className="list-disc list-inside">
                        <li>Rank 2: the columns point in different directions and span the full 2D plane</li>
                        <li>Rank 1: the columns lie on the same line (they are scalar multiples)</li>
                        <li>Rank 0: both columns are the zero vector</li>
                    </ul>

                    <p>
                        In other words, the rank is the number of <strong>linearly independent</strong> columns (or rows). Two columns are linearly independent if you cannot make one by scaling the other.
                    </p>

                    <p>
                        In <strong>larger matrices</strong> (like 3×3 or 4×5), the rank is still the number of independent rows or columns. It's often computed using <em>Gaussian elimination</em> (row reduction) or by checking the number of pivots (leading 1s) in row echelon form.
                    </p>

                    <p>
                        The rank tells you the dimension of the space the matrix can reach. This is essential for understanding solutions to systems like <code>Ax = b</code>, or whether a transformation collapses space.
                    </p>

                    <p>
                        In the visualizer, try adjusting the matrix to make the two columns either align or spread apart. See how the rank changes!
                    </p>
                </div>

                <div className="lg:w-1/2 flex flex-col items-center space-y-4">
                    <MatrixRankVisualizer/>
                    <CompleteLessonButton lessonId={lessonId} />
                    <NextUpButton currentLessonId={lessonId}/>
                </div>
            </div>


        </div>
    );
};

export default MatrixRankLesson;
