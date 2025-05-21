import React from 'react';
import VectorVisualizer from './VectorVisualizer';
import CompleteLessonButton from "./CompleteLessonButton.tsx";

import NextUpButton from "../NextUpButton.tsx";

const lessonId = 'vectors';
const VectorLesson: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="lg:w-1/2">
                <h2 className="text-xl font-semibold mb-2">Understanding Vectors</h2>
                <p className="mb-4">
                    In machine learning, data points and model weights are often represented as <strong>vectors</strong>—quantities with both direction and magnitude.
                </p>
                <p className="mb-4">
                    Below, you can drag the tip of a single vector (<span className="text-blue-600 font-bold">A</span>) to change its value.
                    Try moving it around and notice how its X and Y components change.
                </p>
                <p className="mb-4">
                    Think of vector <strong>A</strong> as representing a single data point or feature.
                    In later lessons, you’ll learn how vectors are used to compute distances, measure similarity, and power algorithms like linear regression.
                </p>
                <h3 className="text-lg font-semibold mt-6 mb-2">What is a Vector's Magnitude?</h3>
                <p className="mb-4">
                    A vector's <strong>magnitude</strong> tells you how long it is—its total size or "length" in space.
                </p>
                <p className="mb-4">
                    It’s calculated using the <strong>Pythagorean Theorem</strong>. For a vector like <code>[x,
                    y]</code>, the magnitude is:
                </p>
                <pre className="bg-gray-100 p-2 rounded mb-4"><code>magnitude = √(x² + y²)</code></pre>
                <p className="mb-4">
                    For example, a vector <code>[3, 4]</code> has a magnitude of:
                </p>
                <pre className="bg-gray-100 p-2 rounded mb-4"><code>magnitude = √(3² + 4²) = √(9 + 16) = √25 = 5</code></pre>
                <p>
                    This value is crucial in machine learning when measuring distance between data points or normalizing
                    direction.
                </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
                <VectorVisualizer />
                <CompleteLessonButton lessonId={lessonId} />
                <NextUpButton currentLessonId={lessonId} />
            </div>

        </div>
    );
};
export default VectorLesson;
