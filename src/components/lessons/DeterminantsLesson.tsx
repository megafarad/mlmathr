import React from 'react';
import {lookupXp} from "../../lookupXp.tsx";
import CompleteLessonButton from "./CompleteLessonButton.tsx";
import DeterminantsVisualizer from "./DeterminantsVisualizer.tsx";

const lessonId = 'determinants';

const DeterminantsLesson: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🧮 Determinants</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        The <strong>determinant</strong> of a matrix describes how it scales space. For a 2×2 matrix, we can visualize this using a simple shape: the <em>unit square</em>, which starts at (0,0) and covers a 1x1 area.
                    </p>
                    <p>
                        When we <strong>apply a matrix</strong> to a shape, we transform every point in that shape according to the matrix. For each corner of the square, we multiply it by the matrix. This gives us a new shape—a <em>parallelogram</em>—that shows how the matrix changes space.
                    </p>
                    <p>
                        The determinant tells us the area of that transformed shape, including whether it was flipped:
                    </p>
                    <ul className="list-disc list-inside">
                        <li><strong>Positive</strong>: Shape is preserved (possibly stretched)</li>
                        <li><strong>Negative</strong>: Shape is flipped (reflected)</li>
                        <li><strong>Zero</strong>: Area collapses to a line or point</li>
                    </ul>
                    <p>
                        ❗ Determinants only exist for <strong>square matrices</strong>, where the number of rows equals the number of columns (e.g. 2×2, 3×3).
                    </p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <DeterminantsVisualizer/>
                    <CompleteLessonButton lessonId={lessonId} xpReward={lookupXp(lessonId)} />
                </div>
            </div>
        </div>
    );
};

export default DeterminantsLesson;
