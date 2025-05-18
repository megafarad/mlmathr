import React from 'react';
import Quiz from '../Quiz';
import {lookupXp} from "../../lookupXp.tsx";

const spanBasisQuestions = [
    {
        question: "What does it mean for two vectors to span 2D space?",
        choices: [
            "They are perpendicular to each other",
            "They point in the same direction",
            "You can reach any point in 2D using combinations of them",
            "They lie on the x-axis",
        ],
        correctIndex: 2,
    },
    {
        question: "Which of these vector pairs are linearly dependent?",
        choices: [
            "[1, 2] and [2, 4]",
            "[1, 0] and [0, 1]",
            "[2, 1] and [-1, 2]",
            "[1, 1] and [0, 1]",
        ],
        correctIndex: 0,
    },
    {
        question: "What makes a pair of vectors a basis for 2D space?",
        choices: [
            "They must be parallel",
            "They must be perpendicular",
            "They must span the space and be linearly independent",
            "They must have the same length",
        ],
        correctIndex: 2,
    },
];

const quizId = "span-basis-quiz";

const SpanBasisQuiz: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Span and Basis</h2>
            <Quiz
                lessonId="span-basis-quiz"
                questions={spanBasisQuestions}
                xpReward={lookupXp(quizId)}
            />
        </div>
    );
};

export default SpanBasisQuiz;
