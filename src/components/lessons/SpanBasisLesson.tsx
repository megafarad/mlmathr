import React from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import SpanBasisVisualizer from './SpanBasisVisualizer';
import {lookupXp} from "../../lookupXp.tsx";

const lessonId = 'span-basis';

const SpanBasisLesson: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">📚 Span and Basis</h1>

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

                <div>
                    <SpanBasisVisualizer />
                    <CompleteLessonButton lessonId={lessonId} xpReward={lookupXp(lessonId)} />
                </div>
            </div>

        </div>
    );
};

export default SpanBasisLesson;
