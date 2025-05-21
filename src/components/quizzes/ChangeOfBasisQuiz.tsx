import React from 'react';
import Quiz from '../Quiz';
import {lookupXp} from "../../lookupXp.tsx";

const changeOfBasisQuestions = [
    {
        question: "What does it mean to 'change basis'?",
        choices: [
            "To rotate all vectors clockwise",
            "To describe vectors in terms of a new set of reference directions",
            "To convert a matrix into row echelon form",
            "To find the determinant of a matrix",
        ],
        correctIndex: 1,
    },
    {
        question: "If A is a matrix whose columns are your new basis vectors, how do you find a vector’s coordinates in the new basis?",
        choices: [
            "Multiply A by the vector",
            "Multiply A by the inverse of the vector",
            "Multiply the inverse of A by the vector",
            "Multiply the vector by the transpose of A",
        ],
        correctIndex: 2,
    },
    {
        question: "Why is it important for a basis to be invertible (i.e., have an inverse matrix)?",
        choices: [
            "So the vectors are all unit length",
            "So the new coordinates are always positive",
            "So we can recover the original vector from its new coordinates",
            "So the basis vectors lie on the same line",
        ],
        correctIndex: 2,
    },
];

const quizId = 'change-of-basis-quiz'

const ChangeOfBasisQuiz: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Change of Basis</h2>
            <Quiz
                lessonId={quizId}
                questions={changeOfBasisQuestions}
                xpReward={lookupXp(quizId)}
            />
        </div>
    );
};

export default ChangeOfBasisQuiz;
