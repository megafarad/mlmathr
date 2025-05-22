import React, { useState } from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import EigenvectorsVisualizer from "./EigenvectorsVisualizer.tsx";
import NextUpButton from "../NextUpButton.tsx";
import Confetti from 'react-confetti';

const lessonId = 'eigenvectors';

const EigenvectorsLesson: React.FC = () => {
    const [goalAchieved, setGoalAchieved] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-6 relative">
            {goalAchieved && <Confetti numberOfPieces={200} recycle={false} />}
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
                        Try adjusting the matrix to find exactly two red vectors—eigenvectors whose directions stay fixed.
                    </p>
                </div>

                <div className='flex flex-col items-center space-y-4'>
                    <EigenvectorsVisualizer onGoalAchieved={() => setGoalAchieved(true)} />
                    {!goalAchieved && (
                        <p className="text-sm text-gray-600">
                            🎯 Goal: Adjust the matrix until you find exactly <strong>two red eigenvectors</strong>.
                        </p>
                    )}
                    {goalAchieved && <CompleteLessonButton lessonId={lessonId} />}
                    <NextUpButton currentLessonId={lessonId} />
                </div>
            </div>
        </div>
    );
};

export default EigenvectorsLesson;
