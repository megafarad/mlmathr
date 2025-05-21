import React from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import { lookupXp } from '../../lookupXp';
import MatrixMultiplicationVisualizer from './MatrixMultiplicationVisualizer';
import NextUpButton from "../NextUpButton.tsx";

const lessonId = 'matrix-multiplication-basics';

const MatrixMultiplicationLesson: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🔢 Multiplying Two Matrices</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        Multiplying two matrices is more than just matching numbers — it's about combining transformations,
                        data, or weights depending on what you're building. But before you can do that, you need to understand
                        how matrix multiplication works.
                    </p>

                    <p>
                        First, not all matrices can be multiplied together. You can only multiply a matrix <code>A</code> by a
                        matrix <code>B</code> if the number of <strong>columns in A</strong> is the same as the number of
                        <strong> rows in B</strong>.
                    </p>

                    <p>
                        For example, if A is a <code>2×3</code> matrix (2 rows, 3 columns) and B is a <code>3×2</code> matrix (3 rows, 2 columns),
                        then you can multiply them. The result will be a <strong>2×2</strong> matrix — because A has 2 rows and B has 2 columns.
                    </p>

                    <p>
                        Each number in the result comes from taking a <strong>row from A</strong> and a <strong>column from B</strong>,
                        multiplying the numbers in those positions together, and adding them up. That process is called the <em>dot product</em>.
                    </p>

                    <p>
                        For example, if the first row of A is <code>[1, 2, 3]</code> and the first column of B is <code>[4, 5, 6]</code>,
                        then their dot product is:
                    </p>

                    <pre className="bg-gray-100 p-2 rounded"><code>
    1×4 + 2×5 + 3×6 = 4 + 10 + 18 = 32
  </code></pre>

                    <p>
                        That value (32) becomes the entry in the first row, first column of the result.
                    </p>

                    <p>
                        In the visual below, try clicking a result cell to see the row and column that produced it — and how the
                        dot product math works. You can also change the values in A and B to explore how it affects the result.
                    </p>
                </div>


                <div className='lg:w-1/2 flex flex-col items-center space-y-4'>
                    <MatrixMultiplicationVisualizer />
                    <CompleteLessonButton lessonId={lessonId} xpReward={lookupXp(lessonId)} />
                    <NextUpButton currentLessonId={lessonId}/>
                </div>
            </div>
        </div>
    );
};

export default MatrixMultiplicationLesson;
