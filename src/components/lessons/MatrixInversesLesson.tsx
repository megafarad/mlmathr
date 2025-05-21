import React, { useState } from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import MatrixInversesVisualizer from "./MatrixInversesVisualizer.tsx";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import NextUpButton from "../NextUpButton.tsx";
import Confetti from 'react-confetti';

const lessonId = 'matrix-inverses';

const mathJaxConfig = {
    loader: { load: ["[tex]/ams"] },
    tex: {
        packages: { "[+]": ["ams"] },
    },
};

const MatrixInversesLesson: React.FC = () => {
    const [goalAchieved, setGoalAchieved] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-6 relative">
            {goalAchieved && <Confetti numberOfPieces={200} recycle={false} />}
            <h1 className="text-2xl font-bold mb-4">🔁 Matrix Inverses</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        A matrix inverse is like an “undo” button for transformations. If you apply a matrix to a shape, and then apply its inverse, the shape returns to its original position.
                    </p>

                    <p>
                        The inverse of a 2×2 matrix
                        <MathJaxContext version={3} config={mathJaxConfig}>
                            <MathJax>
                                {"\\[ A =  \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\]"}
                            </MathJax>
                        </MathJaxContext>
                        is:
                        <MathJaxContext version={3} config={mathJaxConfig}>
                            <MathJax>
                                {`\\[ A^{-1} = \\frac{1}{ad - bc} 
                                \\begin{bmatrix}
                                  d & -b \\\\
                                  -c & a
                                \\end{bmatrix} \\]`}
                            </MathJax>
                        </MathJaxContext>
                    </p>

                    <p>
                        🎯 Try setting Matrix A to:
                        <MathJaxContext version={3} config={mathJaxConfig}>
                            <MathJax>
                                {`\\begin{bmatrix}
                                2 & 1 \\\\
                                1 & 1
                            \\end{bmatrix}`}
                            </MathJax>
                        </MathJaxContext>

                        then apply it and its inverse to return the square to its original shape.
                    </p>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <MatrixInversesVisualizer onGoalAchieved={() => setGoalAchieved(true)} />
                    {!goalAchieved && (
                        <p className="text-sm text-gray-600">
                            🎯 Set A to:
                            <MathJaxContext version={3} config={mathJaxConfig}>
                                <MathJax>
                                    {`\\begin{bmatrix}
                                2 & 1 \\\\
                                1 & 1
                            \\end{bmatrix}`}
                                </MathJax>
                            </MathJaxContext>
                            and step through A and A⁻¹ to complete the challenge.
                        </p>
                    )}
                    {goalAchieved && <CompleteLessonButton lessonId={lessonId} />}
                    <NextUpButton currentLessonId={lessonId} />
                </div>
            </div>
        </div>
    );
};

export default MatrixInversesLesson;
