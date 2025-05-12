import React from 'react';
import Quiz from "../Quiz.tsx";

const questions = [
    {
        question: 'Which of the following best describes the dot product of two vectors?',
        choices: [
            'The area between them',
            'Their perpendicular distance',
            'How aligned they are',
            'Their midpoint'
        ],
        correctIndex: 2,
    },
    {
        question: 'What is the dot product of A = [2, 3] and B = [4, -1]?',
        choices: [
            '5', '1', '10', '0'
        ],
        correctIndex: 0, // 2×4 + 3×(-1) = 8 - 3 = 5
    },
    {
        question: 'If the dot product of two vectors is 0, what does that mean?',
        choices: [
            'They are pointing in the same direction',
            'They are perpendicular',
            'They have the same magnitude',
            'One is a scalar'
        ],
        correctIndex: 1,
    }
];

const DotProductQuiz: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">🧠 Quiz: Dot Product</h2>
            <Quiz lessonId="dot-product-quiz" questions={questions} xpReward={20} />
        </div>
    );
};

export default DotProductQuiz;
