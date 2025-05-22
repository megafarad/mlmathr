import React from 'react';
import Quiz from "../Quiz.tsx";

const quizQuestions = [
    {
        question: 'What is the magnitude of vector [3, 4]?',
        choices: ['5', '7', '6', '12'],
        correctIndex: 0,
    },
    {
        question: 'Which of the following best describes a vector?',
        choices: ['Just a point', 'A number', 'Direction and magnitude', 'A matrix'],
        correctIndex: 2,
    },
];

const quizId = "vectors-quiz";

const VectorQuiz: React.FC = () => {

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Vectors</h2>
            <Quiz quizId={quizId} questions={quizQuestions}/>
        </div>
    );
};

export default VectorQuiz;
