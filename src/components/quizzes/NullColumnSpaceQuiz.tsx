import React from 'react';
import Quiz from '../Quiz';
import {lookupXp} from "../../lookupXp.tsx";

const nullColumnQuestions = [
    {
        question: "What is the null space of a matrix?",
        choices: [
            "The set of vectors that A maps to the zero vector",
            "The space between the columns of A",
            "The output of A when applied to all ones",
            "The rows of A with all zeros removed",
        ],
        correctIndex: 0,
    },
    {
        question: "What does the column space of a matrix represent?",
        choices: [
            "All vectors that A cannot reach",
            "The direction of the rows",
            "The set of all possible outputs of A",
            "The set of vectors that map to zero",
        ],
        correctIndex: 2,
    },
    {
        question: "If a non-zero vector x satisfies Ax = 0, what can we conclude?",
        choices: [
            "A is invertible",
            "x lies in the column space",
            "x lies in the null space",
            "x is orthogonal to A",
        ],
        correctIndex: 2,
    },
];

const quizId = "null-column-space-quiz"

const NullColumnSpaceQuiz: React.FC = () => {
    return (
        <div className='p-4'>
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Null Space & Column Space</h2>
            <Quiz
                lessonId={quizId}
                questions={nullColumnQuestions}
                xpReward={lookupXp(quizId)}
            />
        </div>
    );
};

export default NullColumnSpaceQuiz;
