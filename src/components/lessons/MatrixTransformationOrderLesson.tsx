import React from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import { lookupXp } from "../../lookupXp.tsx";
import MatrixTransformationOrderVisualizer from "./MatrixTransformationOrderVisualizer.tsx";

const lessonId = 'matrix-transformation-order';

const MatrixTransformationOrderLesson: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🔁 Matrix Transformation Order (A · B means “apply B, then A”)</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        In this lesson, you'll explore what happens when you change the order of matrix multiplication.
                    </p>
                    <p>
                        We start with a single vector (gray). Then we show the result of:
                        <ul className="list-disc list-inside ml-4">
                            <li><strong>Green:</strong> Apply Matrix B, then Matrix A — this is A · B applied to the vector.</li>
                            <li><strong>Purple:</strong> Apply Matrix A, then Matrix B — this is B · A applied to the vector.</li>
                        </ul>
                    </p>
                    <p>
                        Try adjusting the matrices. Notice how the green and purple vectors usually end up in different places. This shows that:
                        <br />
                        <code>A · B ≠ B · A</code> in most cases.
                    </p>
                </div>

                <div>
                    <MatrixTransformationOrderVisualizer />
                    <CompleteLessonButton lessonId={lessonId} xpReward={lookupXp(lessonId)} />
                </div>
            </div>
        </div>
    );
};

export default MatrixTransformationOrderLesson;