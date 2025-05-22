import React from 'react';
import Quiz from "../Quiz.tsx";

const questions = [
    {
        question: 'What does a gradient vector represent?',
        choices: [
            'The midpoint between two vectors',
            'The direction of steepest descent',
            'The direction of steepest ascent',
            'The shortest distance between points'
        ],
        correctIndex: 2,
    },
    {
        question: 'What is the gradient of f(x, y) = x² + y²?',
        choices: [
            '[x, y]',
            '[2x, 2y]',
            '[x², y²]',
            '[y, x]'
        ],
        correctIndex: 1,
    },
    {
        question: 'Where is the gradient of f(x, y) = x² + y² equal to zero?',
        choices: [
            'At any point on a circle centered at the origin',
            'At the origin',
            'At [1, 1]',
            'Never'
        ],
        correctIndex: 1,
    }
];

const quizId = "gradient-quiz";

const GradientQuiz: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Gradients</h2>
            <Quiz quizId={quizId} questions={questions}/>
        </div>
    );
};

export default GradientQuiz;
