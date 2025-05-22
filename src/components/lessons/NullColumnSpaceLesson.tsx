import React, {useState} from 'react';
import NullColumnSpaceVisualizer from './NullColumnSpaceVisualizer';
import CompleteLessonButton from "./CompleteLessonButton.tsx";
import NextUpButton from "../NextUpButton.tsx";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Confetti from "react-confetti";

const lessonId = 'null-column-space';

const mathJaxConfig = {
    loader: { load: ["[tex]/ams"] },
    tex: {
        packages: { "[+]": ["ams"] },
    },
};

const matrix = [
    [1, 2],
    [2, 4],
]


const NullColumnSpaceLesson: React.FC = () => {

    const [goalAchieved, setGoalAchieved] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {goalAchieved && (<Confetti numberOfPieces={200} recycle={false}/>)}
            <h1 className="text-2xl font-bold">🚫 Null Space & 📦 Column Space</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        When we apply a matrix transformation <code>A</code> to a vector <code>x</code>, we get a new vector <code>Ax</code>.
                    </p>

                    <p>
                        The <strong>column space</strong> of a matrix is the set of all possible outputs—it's the space spanned by the matrix's columns. If a matrix maps vectors into 2D space, its column space is a 2D region (like a plane).
                    </p>

                    <p>
                        The <strong>null space</strong> is the set of vectors that get flattened to zero by the matrix. That means <code>Ax = 0</code>. These are directions the matrix “kills”—you put something in, and it vanishes.
                    </p>

                    <p>
                        The bigger the null space, the more input directions the matrix throws away.
                    </p>

                    <p>
                        Try exploring the visualizer. To complete this lesson, find a non-zero input that maps to the zero vector.
                    </p>

                    <p>
                        The matrix used in this visualizer is:
                        <MathJaxContext version={3} config={mathJaxConfig}>
                            <MathJax>
                                {`
                                   \\[A = \\begin{bmatrix}
                                    ${matrix[0][0]} & ${matrix[0][1]} \\\\
                                    ${matrix[1][0]} & ${matrix[1][1]}
                                    \\end{bmatrix} \\]
                                `}
                            </MathJax>
                        </MathJaxContext>
                    </p>
                    <p>
                        Try to find a nonzero vector <code>x</code> such that <code>Ax = 0</code>.
                    </p>

                </div>

                <div className='flex flex-col items-center space-y-4'>
                    <NullColumnSpaceVisualizer onGoalAchieved={() => setGoalAchieved(true)} matrix={matrix}/>
                    {goalAchieved ? (
                        <div className="text-green-600 font-semibold">✅ Vector is in the null space!</div>
                    ) : (
                        <div className="text-gray-600">🎯 Try to make the transformed vector zero</div>
                    )}
                    {goalAchieved && <CompleteLessonButton lessonId={lessonId}/>}
                    <NextUpButton currentLessonId={lessonId}/>
                </div>
            </div>
        </div>
    );
};

export default NullColumnSpaceLesson;
