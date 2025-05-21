import React from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import MatrixInversesVisualizer from "./MatrixInversesVisualizer.tsx";
import {MathJax, MathJaxContext} from "better-react-mathjax";
import NextUpButton from "../NextUpButton.tsx";

const lessonId = 'matrix-inverses';

const mathJaxConfig = {
    loader: { load: ["[tex]/ams"] },
    tex: {
        packages: { "[+]": ["ams"] },
    },
};


const MatrixInversesLesson: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🔁 Matrix Inverses</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        A matrix inverse is like an “undo” button for transformations. If you apply a matrix to a shape (like a square), and then apply its inverse, the shape returns to its original position.
                    </p>

                    <p>
                        A matrix transforms each point in the shape by multiplying the matrix with that point as a vector. For a square, this means multiplying each of its four corners by the matrix, which skews, stretches, or rotates it.
                    </p>

                    <p>
                        The inverse of a 2×2 matrix
                        <MathJaxContext version={3} config={mathJaxConfig}>
                            <MathJax>
                                {"\\[ A =  \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\]"}
                            </MathJax>
                        </MathJaxContext>
                        is given by:
                    </p>

                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
  A⁻¹ = (1 / (ad - bc)) * [[d, -b], [-c, a]]
</pre>

                    <p>
                        The value <code>(ad - bc)</code> is the <strong>determinant</strong> of the matrix. If it's zero, the matrix has no inverse—it squashes space in a way that can’t be undone.
                    </p>
                    <p>
                        In machine learning, inverses are useful for solving systems of equations and understanding how data is transformed through layers.
                    </p>
                    <p>
                        In the visualizer, you can apply a matrix to a unit square, and then see what happens when you apply its inverse. Try experimenting with different matrix values to see how they affect the shape.
                    </p>
                </div>

                <div className="lg:w-1/2 flex flex-col items-center space-y-4">
                    <MatrixInversesVisualizer />
                    <CompleteLessonButton lessonId={lessonId} />
                    <NextUpButton currentLessonId={lessonId}/>
                </div>
            </div>
        </div>
    );
};

export default MatrixInversesLesson;
