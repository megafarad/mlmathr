import React, { useState } from 'react';
import LinearCombinationVisualizer from './LinearCombinationVisualizer';
import CompleteLessonButton from './CompleteLessonButton';
import NextUpButton from "../NextUpButton.tsx";

const lessonId = 'linear-combinations';

const LinearCombinationLesson: React.FC = () =>  {
    const [a, setA] = useState(1);
    const [b, setB] = useState(1);

    const v1 = [1, 0];
    const v2 = [0, 1];
    const result = [a * v1[0] + b * v2[0], a * v1[1] + b * v2[1]];

    return (
        <div className="max-w-4xl mx-auto p-6">
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

                <div className='lg:w-1/2 flex flex-col items-center space-y-4'>
                    <LinearCombinationVisualizer a={a} b={b} onChange={(a, b) => { setA(a); setB(b); }} />
                    <CompleteLessonButton lessonId={lessonId} />
                    <NextUpButton currentLessonId={lessonId}/>
                </div>
            </div>
        </div>
    );
};

export default LinearCombinationLesson;
