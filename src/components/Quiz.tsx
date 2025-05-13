import React, { useState, useEffect, useMemo } from 'react';
import { useXp } from "./context/XpContext.tsx";

type Question = {
    question: string;
    choices: string[];
    correctIndex: number;
};

type Props = {
    lessonId: string;
    questions: Question[];
    xpReward: number;
};

const Quiz: React.FC<Props> = ({ lessonId, questions, xpReward }) => {
    const { addXpForLesson, hasCompleted, quizScores, setQuizScores, revision, setRevision } = useXp();
    const [isCompleted] = useState(() => hasCompleted(lessonId));
    const initialSelected = useMemo(() => Array(questions.length).fill(null), [questions.length]);
    const [selected, setSelected] = useState<(number | null)[]>(initialSelected);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [justFailed, setJustFailed] = useState(false);

    const handleRetry = () => {
        setSelected(initialSelected);
        setSubmitted(false);
        setScore(null);
        setJustFailed(false);

        // Remove quiz score from cloud progress state
        setQuizScores((prev) => {
            const copy = { ...prev };
            delete copy[lessonId];
            return copy;
        });

        setRevision((r) => r + 1);
    };



    useEffect(() => {
        const savedScore = quizScores[lessonId];
        const wasSubmitted = savedScore !== undefined;

        setSubmitted(wasSubmitted);
        setScore(savedScore ?? null);

        // Only reset answers if user hasn't submitted yet
        if (!wasSubmitted) {
            setSelected(initialSelected);
        }
    }, [lessonId, revision, quizScores, questions.length, initialSelected]);

    const handleSubmit = () => {
        if (submitted || selected.includes(null)) return;

        const correctCount = selected.reduce<number>((total, answer, i) => {
            return answer === questions[i].correctIndex ? total + 1 : total;
        }, 0);

        setSubmitted(true);
        setScore(correctCount);

        const passed = correctCount === questions.length;
        setJustFailed(!passed); // shows retry button if needed

        setQuizScores((prev) => ({
            ...prev,
            [lessonId]: correctCount,
        }));

        if (passed) addXpForLesson(lessonId, xpReward);
    };


    return (
        <div className="space-y-6">
            {questions.map((q, i) => (
                <div key={i} className="space-y-2">
                    <p className="font-medium">{q.question}</p>
                    <ul className="space-y-1">
                        {q.choices.map((choice, idx) => {
                            const isCorrectAnswer = idx === q.correctIndex;
                            const isUserAnswer = selected[i] === idx;

                            const isCorrectSelection = submitted && isUserAnswer && isCorrectAnswer;
                            const isIncorrectSelection = submitted && isUserAnswer && !isCorrectAnswer;

                            return (
                                <li key={idx}>
                                    <label
                                        className={`flex items-center space-x-2 cursor-pointer ${
                                            isCorrectSelection ? 'text-green-600 font-semibold' :
                                                isIncorrectSelection ? 'text-red-600 font-semibold' : ''
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`q-${i}`}
                                            disabled={submitted || isCompleted}
                                            checked={isUserAnswer}
                                            onChange={() => {
                                                const copy = [...selected];
                                                copy[i] = idx;
                                                setSelected(copy);
                                            }}
                                        />
                                        <span>{choice}</span>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}

            {isCompleted ? (
                <div className="text-green-600 font-semibold">✅ Quiz Completed</div>
            ) : submitted ? (
                    <div
                        className="transition-all duration-500 ease-in-out transform animate-fade-in space-y-2 text-blue-600 font-semibold"
                    >
                        <div className="text-blue-600 font-semibold space-y-2">
                            {score !== null && (
                                <p>📝 You got {score} out of {questions.length} correct.</p>
                            )}
                            {score === questions.length ? (
                                <p>✅ All correct! You earned {xpReward} XP.</p>
                            ) : (
                                <>
                                    <p>❌ Some answers were incorrect. Try again.</p>
                                    <button
                                        onClick={handleRetry}
                                        className={`mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 ${
                                            justFailed ? 'animate-shake' : ''
                                        }`}
                                    >
                                        🔁 Try Again
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

            ) : (
                <button
                    disabled={selected.includes(null)}
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Quiz
                </button>
            )}
        </div>
    );
};

export default Quiz;
