import React from 'react';
import Quiz from '../Quiz';

const inverseQuestions = [
    {
        question: "What does it mean for a matrix to have an inverse?",
        choices: [
            "You can transpose it",
            "It can be written as a diagonal matrix",
            "It can undo the transformation of the original matrix",
            "Its determinant is 1",
        ],
        correctIndex: 2,
    },
    {
        question: "Which of the following matrices has no inverse?",
        choices: [
            "[[2, 0], [0, 2]]",
            "[[0, 0], [0, 0]]",
            "[[1, 2], [3, 4]]",
            "[[1, 0], [0, 1]]",
        ],
        correctIndex: 1,
    },
    {
        question: "How do you compute the inverse of a 2×2 matrix [[a, b], [c, d]]?",
        choices: [
            "Swap a and d, negate b and c, then divide by (ad - bc)",
            "Flip the matrix and negate everything",
            "Subtract the transpose from the identity matrix",
            "Use the trace and plug it into a formula",
        ],
        correctIndex: 0,
    },
];

const quizId = "matrix-inverses-quiz"

const MatrixInversesQuiz: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Matrix Inverses</h2>
            <Quiz
                quizId={quizId}
                questions={inverseQuestions}
            />
        </div>
    );
};

export default MatrixInversesQuiz;
