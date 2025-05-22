import React, { useState } from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import SpanBasisDimensionVisualizer from './SpanBasisDimensionVisualizer.tsx';
import NextUpButton from "../NextUpButton.tsx";
import Confetti from 'react-confetti';

const lessonId = 'span-basis';

const SpanBasisDimensionLesson: React.FC = () => {
    const [goalAchieved, setGoalAchieved] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-6 relative">
            {goalAchieved && <Confetti numberOfPieces={200} recycle={false} />}
            <h1 className="text-2xl font-bold mb-4">📚 Span, Basis, and Dimension</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        The <strong>span</strong> of a set of vectors is all the points you can reach by taking linear combinations of those vectors.
                    </p>
                    <p>
                        For example, the vectors <code>[1, 0]</code> and <code>[0, 1]</code> can reach any point in 2D space. They span the entire 2D plane.
                    </p>
                    <p>
                        If you only have one vector like <code>[1, 1]</code>, the span is just a line—any scalar multiple of that vector.
                    </p>
                    <p>
                        A <strong>basis</strong> is the smallest possible set of vectors that still span a space. In 2D, you need <strong>two linearly independent vectors</strong> to span the full plane.
                    </p>
                    <p>
                        Two vectors are <strong>linearly dependent</strong> if one is a scalar multiple of the other. That means they point in the same or opposite direction.
                    </p>
                    <p>
                        The <strong>dimension</strong> of a space is the number of vectors in its basis. For example:
                    </p>
                    <ul className="list-disc ml-6">
                        <li>A single vector spans a 1D line → dimension 1</li>
                        <li>Two independent vectors span a 2D plane → dimension 2</li>
                    </ul>
                    <p>
                        If the vectors aren’t independent, they don’t expand the space—you’re still stuck in 1D.
                    </p>
                    <p>
                        To check if two vectors <code>[x₁, y₁]</code> and <code>[x₂, y₂]</code> are dependent:
                        <br />
                        <code>x₁·y₂ === y₁·x₂</code>
                        <br />
                        If this is true, their span collapses to a line.
                    </p>
                    <p>
                        As you move the vectors in the visual:
                        <ul className="list-disc list-inside mt-2">
                            <li>
                                If they are <strong>independent</strong>, you'll see a <em>shaded parallelogram</em> showing the area they span.
                            </li>
                            <li>
                                If they are <strong>dependent</strong>, the area disappears, and only a <em>line</em> is shown.
                            </li>
                        </ul>
                        This shows how independence increases the “reach” of your vectors.
                    </p>
                </div>

                <div className='flex flex-col items-center space-y-4'>
                    <SpanBasisDimensionVisualizer onGoalAchieved={() => setGoalAchieved(true)} />
                    {!goalAchieved && (
                        <p className="text-sm text-gray-600">
                            🎯 Try to make the vectors linearly <strong>independent</strong>
                        </p>
                    )}
                    {goalAchieved && <CompleteLessonButton lessonId={lessonId} />}
                    <NextUpButton currentLessonId={lessonId} />
                </div>
            </div>
        </div>
    );
};

export default SpanBasisDimensionLesson;
