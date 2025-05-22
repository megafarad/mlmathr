import React from 'react';
import Quiz from '../Quiz.tsx';

const questions = [
    {
        question: 'If A is a 2×3 matrix and B is a 3×4 matrix, what is the shape of A × B?',
        choices: [
            '2×4',
            '3×3',
            '3×4',
            '2×3',
        ],
        correctIndex: 0,
    },
    {
        question: 'How is each value in the result of matrix multiplication calculated?',
        choices: [
            'By subtracting each element in the row and column',
            'By multiplying all values in a row and a column directly',
            'By computing the dot product of a row from A and a column from B',
            'By adding corresponding rows',
        ],
        correctIndex: 2,
    },
    {
        question: 'What condition must be true to multiply matrix A × B?',
        choices: [
            'A must be square',
            'B must have the same shape as A',
            'A must have the same number of rows as B',
            'The number of columns in A must equal the number of rows in B',
        ],
        correctIndex: 3,
    },
    {
        question: 'If A = [[1, 2], [3, 4]] and B = [[0, 1], [1, 0]], what is A × B?',
        choices: [
            '[[2, 1], [4, 3]]', // ✅ correct
            '[[1, 2], [3, 4]]', // ❌ just A
            '[[1, 0], [0, 1]]', // ❌ identity matrix (often guessed)
            '[[1, 2], [3, -4]]', // ❌ visually similar but wrong
        ],
        correctIndex: 0,
    },
];

const quizId = 'matrix-multiplication-basics-quiz';

const MatrixMultiplicationQuiz: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Matrix Multiplication</h2>
            <Quiz quizId={quizId} questions={questions}/>
        </div>
    );
};

export default MatrixMultiplicationQuiz;
