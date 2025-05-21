import GradientVisualizer from './GradientVisualizer';
import CompleteLessonButton from "./CompleteLessonButton.tsx";
import {lookupXp} from "../../lookupXp.tsx";
import NextUpButton from "../NextUpButton.tsx";

const GradientLesson: React.FC = () => {
    const lessonId = 'gradient';

    return (
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="lg:w-1/2 space-y-4">
                <h2 className="text-xl font-semibold">Gradients</h2>

                <p>
                    In machine learning, <strong>gradients</strong> tell us how to change a model to reduce its error.
                    They point in the direction of steepest increase of a function—and in training, we go in the <em>opposite</em> direction to minimize loss.
                </p>

                <p>
                    Below is a simple function: <code>f(x, y) = x² + y²</code>.
                    Try dragging the blue point around to see how the gradient vector (in red) changes.
                </p>

                <p>
                    The gradient is calculated as:
                </p>

                <pre className="bg-gray-100 p-2 rounded"><code>∇f(x, y) = [2x, 2y]</code></pre>

                <p>
                    Notice how it always points directly away from the center, and its length increases as you move farther from the origin.
                </p>
            </div>

            <div className="lg:w-1/2 flex flex-col items-center space-y-4">
                <GradientVisualizer />
                <CompleteLessonButton lessonId={lessonId} xpReward={lookupXp(lessonId)}/>
                <NextUpButton currentLessonId={lessonId}/>
            </div>
        </div>

    );
};

export default GradientLesson;
