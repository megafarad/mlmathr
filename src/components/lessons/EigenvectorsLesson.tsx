import React from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import EigenvectorsVisualizer from "./EigenvectorsVisualizer.tsx";
import NextUpButton from "../NextUpButton.tsx";

const lessonId = 'eigenvectors';

const EigenvectorsLesson: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🧭 Eigenvectors & Eigenvalues</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        An <strong>eigenvector</strong> of a matrix is a special vector whose direction does not change when the matrix is applied—it only gets stretched or flipped.
                    </p>

                    <p>
                        Mathematically, a vector <code>v</code> is an eigenvector of a matrix <code>A</code> if:
                    </p>

                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
  A · v = λ · v
</pre>

                    <p>
                        where <code>λ</code> (lambda) is a scalar called the <strong>eigenvalue</strong>. This means that multiplying the matrix by the vector has the same effect as simply scaling the vector.
                    </p>

                    <p>
                        In 2D, you can find eigenvectors by checking which directions stay the same (other than scaling) after transformation. All other directions get rotated or bent.
                    </p>

                    <p>
                        In the visualizer, we test vectors around a circle. Red lines show eigenvectors: directions where the matrix only stretches the vector. Blue lines show directions that change.
                    </p>

                    <p>
                        This concept is a cornerstone in linear algebra and is widely used in machine learning—for example, in Principal Component Analysis (PCA).
                    </p>

                </div>

                <div className='lg:w-1/2 flex flex-col items-center space-y-4'>
                    <EigenvectorsVisualizer/>
                    <CompleteLessonButton lessonId={lessonId} />
                    <NextUpButton currentLessonId={lessonId}/>
                </div>
            </div>
        </div>
    );
};

export default EigenvectorsLesson;
