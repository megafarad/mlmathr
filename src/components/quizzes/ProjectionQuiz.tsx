import React from 'react';
import Quiz from '../Quiz';

const projectionQuestions = [
    {
        question: "What does the projection of vector b onto vector a represent?",
        choices: [
            "The angle between b and a",
            "The part of b that points in the direction of a",
            "The area spanned by a and b",
            "The midpoint between a and b",
        ],
        correctIndex: 1,
    },
    {
        question: "Which of these is the correct formula for projecting b onto a?",
        choices: [
            "(a · b) * b",
            "(a · a) / (a · b) * b",
            "(a · b) / (a · a) * a",
            "(b · b) / (a · a) * a",
        ],
        correctIndex: 2,
    },
    {
        question: "If b is perpendicular to a, what will the projection of b onto a be?",
        choices: [
            "Equal to a",
            "Equal to b",
            "The zero vector",
            "A longer version of a",
        ],
        correctIndex: 2,
    },
];

const quizId = "projections-quiz";

const ProjectionQuiz: React.FC = () => {
    return (
        <div  className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Vector Projections</h2>
            <Quiz
                quizId={quizId}
                questions={projectionQuestions}
            />
        </div>
    );
};

export default ProjectionQuiz;
