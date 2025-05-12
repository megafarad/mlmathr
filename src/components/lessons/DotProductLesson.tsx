import React from 'react';
import DotProductVisualizer from './DotProductVisualizer';
import {useXp} from "../context/XpContext.tsx";

const DotProductLesson: React.FC = () => {
    const { addXpForLesson, hasCompleted, isUnlocked } = useXp();
    const isCompleted = hasCompleted('dot-product');
    const unlocked = isUnlocked('dot-product');

    if (!unlocked) {
        return (
            <div className="p-4 text-center text-gray-600">
                <p className="text-2xl">🔒 Locked</p>
                <p className="mt-2">Complete the <strong>Vectors Quiz</strong> to unlock this lesson.</p>
                {/* Optional: link back */}
                <p className="mt-4">
                    <a href="/lesson/vectors" className="text-blue-600 underline">
                        Go to Vectors Lesson
                    </a>
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="lg:w-1/2 space-y-4">
                <h2 className="text-xl font-semibold">Lesson 2: The Dot Product</h2>

                <p>
                    The <strong>dot product</strong> is a fundamental operation in linear algebra and machine learning. It’s a way to measure how aligned two vectors are.
                </p>

                <p>
                    For two vectors <code>A = [x₁, y₁]</code> and <code>B = [x₂, y₂]</code>, the dot product is calculated as:
                </p>

                <pre className="bg-gray-100 p-2 rounded"><code>dot = x₁·x₂ + y₁·y₂</code></pre>

                <p>
                    The result tells us about the <strong>angle</strong> between the vectors:
                </p>

                <ul className="list-disc list-inside ml-4">
                    <li>Positive → vectors point in similar directions</li>
                    <li>Zero → vectors are perpendicular (90° apart)</li>
                    <li>Negative → vectors point in opposite directions</li>
                </ul>

                <p>
                    We can also calculate the <strong>angle θ</strong> between them using the formula:
                </p>

                <pre className="bg-gray-100 p-2 rounded"><code>θ = arccos(dot / (|A| · |B|))</code></pre>

                <p>
                    The <strong>arccos</strong> (also written <em>cos⁻¹</em>) is the <em>inverse</em> of the cosine function—it gives you an angle when you know its cosine.
                </p>

                <p>
                    For example, if <code>cos(θ) = 0.5</code>, then <code>arccos(0.5) = 60°</code>.
                </p>

                <p>
                    Try moving the vectors below. Watch how the angle and dot product change!
                </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
                <DotProductVisualizer />
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => addXpForLesson('dot-product', 25)}
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
        </div>

    )
}

export default DotProductLesson;
