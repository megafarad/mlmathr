import React from 'react';
import CompleteLessonButton from './CompleteLessonButton';
import ProjectionVisualizer from "./ProjectionVisualizer";
import {lookupXp} from "../../lookupXp.tsx";

const lessonId = 'projections';

const ProjectionLesson: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">📐 Vector Projections</h1>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                    <p>
                        The <strong>projection</strong> of one vector onto another shows how much of one vector "lies in the direction" of another.
                    </p>
                    <p>
                        Imagine shining a light directly down on a vector — the shadow it casts onto another vector is the projection.
                    </p>
                    <p>
                        Mathematically, to project vector <code>b</code> onto vector <code>a</code>, we use:
                        <br />
                        <code>projₐ(b) = [(a · b) / (a · a)] * a</code>
                    </p>
                    <p>
                        - The dot product <code>a · b</code> measures alignment.<br />
                        - Dividing by <code>a · a</code> normalizes to the length of <code>a</code>.<br />
                        - Then we scale <code>a</code> by that factor.
                    </p>
                    <p>
                        Try dragging the vectors below to see how the projection changes!
                    </p>
                </div>

                <div>
                    <ProjectionVisualizer/>
                    <CompleteLessonButton lessonId={lessonId} xpReward={lookupXp(lessonId)} />
                </div>
            </div>

        </div>
    );
};

export default ProjectionLesson;
