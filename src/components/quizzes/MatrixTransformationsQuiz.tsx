import React from 'react';
import Quiz from "../Quiz.tsx";

const questions = [
    {
        question: 'What is the result of multiplying [[2, 0], [0, 3]] × [1, 1]?',
        choices: [
            '[2, 3]',
            '[3, 2]',
            '[1, 1]',
            '[5, 5]'
        ],
        correctIndex: 0,
    },
    {
        question: 'Which of these matrices scales a vector uniformly in all directions?',
        choices: [
            '[[2, 0], [0, 2]]',
            '[[1, 2], [3, 4]]',
            '[[0, 1], [-1, 0]]',
            '[[1, 0], [0, -1]]'
        ],
        correctIndex: 0,
    },
    {
        question: 'What is the effect of multiplying by [[0, -1], [1, 0]]?',
        choices: [
            'Scales the vector',
            'Reflects over the x-axis',
            'Rotates the vector 90° counterclockwise',
            'No effect'
        ],
        correctIndex: 2,
    }
];

const quizId = "matrix-transformations-quiz";

const MatrixTransformationsQuiz: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Matrix Transformations</h2>
            <Quiz quizId={quizId} questions={questions}/>
        </div>
    );
};

export default MatrixTransformationsQuiz;
