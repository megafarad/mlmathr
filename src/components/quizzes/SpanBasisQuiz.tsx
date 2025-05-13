import React from 'react';
import Quiz from '../Quiz';

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

const SpanBasisQuiz: React.FC = () => {
    return (
        <Quiz
            lessonId="span-basis-quiz"
            questions={spanBasisQuestions}
            xpReward={10}
        />
    );
};

export default SpanBasisQuiz;
