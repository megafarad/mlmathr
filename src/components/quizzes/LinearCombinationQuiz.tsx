import React from 'react';
import Quiz from '../Quiz';
import {lookupXp} from "../../lookupXp.tsx";

const linearComboQuestions = [
    {
        question: "What is a linear combination?",
        choices: [
            "Adding two numbers together",
            "Scaling and adding vectors",
            "Multiplying vectors only",
            "Flipping a vector around the origin",
        ],
        correctIndex: 1,
    },
    {
        question: "If v₁ = [1, 0] and v₂ = [0, 1], what is 2·v₁ + 3·v₂?",
        choices: [
            "[2, 3]",
            "[3, 2]",
            "[2, -3]",
            "[-2, 3]",
        ],
        correctIndex: 0,
    },
    {
        question: "What does it mean when two vectors 'span' a space?",
        choices: [
            "They are perpendicular",
            "They cover every point in that space through combinations",
            "They point in the same direction",
            "They cancel each other out",
        ],
        correctIndex: 1,
    },
];

const quizId = "linear-combinations-quiz";

const LinearCombinationQuiz: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Linear Combinations</h2>
            <Quiz lessonId={quizId} questions={linearComboQuestions} xpReward={lookupXp(quizId)} />
        </div>
    );
};

export default LinearCombinationQuiz;
