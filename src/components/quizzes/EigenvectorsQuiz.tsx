import React from 'react';
import Quiz from '../Quiz';
import {lookupXp} from "../../lookupXp.tsx";

const eigenQuestions = [
    {
        question: "What is an eigenvector?",
        choices: [
            "A vector that always increases in magnitude",
            "A vector that stays in the same direction after a matrix is applied",
            "A row of the matrix",
            "A vector that always rotates 90 degrees under any matrix",
        ],
        correctIndex: 1,
    },
    {
        question: "What is the role of the eigenvalue λ in the equation A·v = λ·v?",
        choices: [
            "It rotates the eigenvector",
            "It measures how much the vector is scaled",
            "It counts the number of eigenvectors",
            "It's only used in 3D",
        ],
        correctIndex: 1,
    },
    {
        question: "If a matrix has an eigenvector in direction [1, 0], what happens when that matrix is applied to [1, 0]?",
        choices: [
            "It rotates the vector 180 degrees",
            "It becomes zero",
            "It stays in the same direction, but may be scaled",
            "It flips to [-1, 0] every time",
        ],
        correctIndex: 2,
    },
];

const quizId = "eigenvectors-quiz"

const EigenvectorsQuiz: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Eigenvectors and Eigenvalues</h2>
            <Quiz
                lessonId={quizId}
                questions={eigenQuestions}
                xpReward={lookupXp(quizId)}
            />
        </div>
    );
};

export default EigenvectorsQuiz;
