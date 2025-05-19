import React from 'react';
import Quiz from '../Quiz';
import {lookupXp} from "../../lookupXp.tsx";

const determinantQuestions = [
    {
        question: "What does the determinant of a 2×2 matrix represent?",
        choices: [
            "The number of nonzero entries in the matrix",
            "The area scaling factor of the transformed space",
            "The length of the longest column",
            "The angle between the columns",
        ],
        correctIndex: 1,
    },
    {
        question: "If a matrix has a determinant of 0, what does that mean?",
        choices: [
            "It has no inverse and collapses space",
            "It rotates space 90 degrees",
            "It preserves area",
            "It scales vectors by zero but keeps their direction",
        ],
        correctIndex: 0,
    },
    {
        question: "Which of these matrices can have a determinant?",
        choices: [
            "A 2×3 matrix",
            "A 3×2 matrix",
            "A 3×3 matrix",
            "Any matrix with at least one row and one column",
        ],
        correctIndex: 2,
    },
];

const quizId = "determinants-quiz";

const DeterminantsQuiz: React.FC = () => {
    return (
        <Quiz
            lessonId={quizId}
            questions={determinantQuestions}
            xpReward={lookupXp(quizId)}
        />
    );
};

export default DeterminantsQuiz;
