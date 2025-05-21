import React, { useState, useEffect, useMemo } from 'react';
import LinearCombinationVisualizer from './LinearCombinationVisualizer';
import CompleteLessonButton from './CompleteLessonButton';
import NextUpButton from "../NextUpButton.tsx";
import Confetti from 'react-confetti';

const lessonId = 'linear-combinations';

const LinearCombinationLesson: React.FC = () => {
    const [a, setA] = useState(1);
    const [b, setB] = useState(1);
    const [goalAchieved, setGoalAchieved] = useState(false);

    const v1 = useMemo(() => [1, 0], []);
    const v2 = useMemo(() => [0, 1], []);

    const result = useMemo(() => [
        a * v1[0] + b * v2[0],
        a * v1[1] + b * v2[1]
    ], [a, b, v1, v2]);

    const target = useMemo(() => [3, 2], []);

    const isClose = (v1: number[], v2: number[], tol = 0.01) =>
        Math.abs(v1[0] - v2[0]) < tol && Math.abs(v1[1] - v2[1]) < tol;

    useEffect(() => {
        if (!goalAchieved && isClose(result, target)) {
            setA(3); // Snap
            setB(2);
            setGoalAchieved(true);
        }
    }, [result, target, goalAchieved]);

    return (
        <div className="max-w-4xl mx-auto p-6 relative">
            {goalAchieved && <Confetti numberOfPieces={200} recycle={false} />}
            <h1 className="text-2xl font-bold mb-4">📚 Linear Combinations</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        A <strong>vector</strong> is like an arrow—it has both direction and length. A <strong>scalar</strong> is just a number.
                    </p>
                    <p>
                        A <strong>linear combination</strong> means scaling vectors (multiplying by scalars) and adding them together. For example: <code>a·v₁ + b·v₂</code>.
                    </p>
                    <p>
                        In this lesson:
                        <ul className="list-disc list-inside mt-2">
                            <li><span className="text-blue-600">Blue</span> is vector v₁ (e.g. [1, 0])</li>
                            <li><span className="text-green-600">Green</span> is vector v₂ (e.g. [0, 1])</li>
                            <li><span className="text-red-600">Red</span> is the result of a·v₁ + b·v₂</li>
                        </ul>
                    </p>
                    <p>
                        As you adjust the sliders, you’re choosing how much of v₁ and v₂ you want. The red vector shows where that combination leads.
                    </p>
                    <p className="bg-gray-100 rounded p-2 font-mono">
                        Result = {a}·[1, 0] + {b}·[0, 1] = [{result[0]}, {result[1]}]
                    </p>
                </div>

                <div className='flex flex-col items-center space-y-4'>
                    <LinearCombinationVisualizer a={a} b={b} onChange={(a, b) => { setA(a); setB(b); }} />
                    {!goalAchieved && (
                        <p className="text-sm text-gray-600">
                            🎯 Try setting the result vector to <strong>[3, 2]</strong>
                        </p>
                    )}
                    {goalAchieved && <CompleteLessonButton lessonId={lessonId} />}
                    <NextUpButton currentLessonId={lessonId} />
                </div>
            </div>
        </div>
    );
};

export default LinearCombinationLesson;
