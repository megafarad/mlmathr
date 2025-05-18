import React from 'react';
import Quiz from '../Quiz.tsx';
import { lookupXp } from '../../lookupXp.tsx';

const questions = [
    {
        question: 'If A and B are matrices, does A × B equal B × A?',
        choices: [
            'Yes, matrix multiplication is commutative',
            'No, the result usually changes depending on the order',
            'Only if A and B are the same matrix',
            'Only if A is the identity matrix',
        ],
        correctIndex: 1,
    },
    {
        question: 'What does the expression A · B · v mean?',
        choices: [
            'Apply matrix A to B, then to v',
            'Apply matrix B to A, then to v',
            'Apply B to vector v, then apply A to that result',
            'You can’t apply two matrices to a vector',
        ],
        correctIndex: 2,
    },
    {
        question: 'Which of the following is always true?',
        choices: [
            'A · (B · v) = (A · B) · v',
            'A · (B · v) = B · (A · v)',
            '(A · B) · v = (B · A) · v',
            'A · B = B · A for any matrices',
        ],
        correctIndex: 0,
    },
    {
        question: 'If matrix A is a rotation and matrix B is a shear, what happens if you switch the order (A · B vs B · A)?',
        choices: [
            'You get the same result either way',
            'You undo the transformation',
            'You get a completely different transformation',
            'One transformation cancels out the other',
        ],
        correctIndex: 2,
    },
];

const quizId = 'matrix-transformation-order-quiz';

const MatrixTransformationOrderQuiz: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Matrix Transformation Order</h2>
            <Quiz lessonId={quizId} questions={questions} xpReward={lookupXp(quizId)} />
        </div>
    );
};

export default MatrixTransformationOrderQuiz;
