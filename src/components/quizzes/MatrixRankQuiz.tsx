import React from 'react';
import Quiz from '../Quiz';
import {lookupXp} from "../../lookupXp.tsx";

const rankQuestions = [
    {
        question: "What does the rank of a matrix tell you?",
        choices: [
            "The number of nonzero entries",
            "How many independent rows or columns it has",
            "The size of the matrix",
            "The number of zeros on the diagonal",
        ],
        correctIndex: 1,
    },
    {
        question: "What is the rank of this matrix? [[2, 4], [1, 2]]",
        choices: [
            "0",
            "1",
            "2",
            "It depends on the determinant",
        ],
        correctIndex: 1, // columns are scalar multiples
    },
    {
        question: "If the rank of a 3×3 matrix is 2, what does that mean?",
        choices: [
            "It is invertible",
            "Its columns span all of 3D space",
            "One column is a combination of the others",
            "All rows are independent",
        ],
        correctIndex: 2,
    },
];

const quizId = "matrix-rank-quiz"

const MatrixRankQuiz: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Matrix Rank</h2>
            <Quiz
                lessonId={quizId}
                questions={rankQuestions}
                xpReward={lookupXp(quizId)}
            />
        </div>
    );
};

export default MatrixRankQuiz;
