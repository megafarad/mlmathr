import React, { useState, useMemo } from 'react';
import { GraphCanvas, type CanvasVector } from "@sirhc77/canvas-math-kit";

const width = 300;
const height = 300;
const scale = 15;

interface VectorVisualizerProps {
    onGoalAchieved?: () => void;
    goalMagnitude?: number;
    goalTolerance?: number;
}

const VectorVisualizer: React.FC<VectorVisualizerProps> = ({
                                                            onGoalAchieved,
                                                            goalMagnitude,
                                                            goalTolerance,
                                                           }) => {
    const [vector, setVector] = useState<CanvasVector>({ x: 3, y: 3, color: 'blue', draggable: true, headStyle: 'both' });
    const [goalFired, setGoalFired] = useState(false);

    const vectors = useMemo(() => [vector], [vector]);

    const currentMagnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2);

    const handleVectorsChange = (updated: CanvasVector[]) => {
        const [newVector] = updated;
        setVector(newVector);
        if (!goalFired && Math.abs(currentMagnitude - (goalMagnitude ?? 10)) < (goalTolerance ?? 0.3)) {
            onGoalAchieved?.();
            setGoalFired(true);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <GraphCanvas
                width={width}
                height={height}
                scale={scale}
                vectors={vectors}
                locked={goalFired}
                onVectorsChange={handleVectorsChange}
                snap={1}
            />

            <div className="text-center">
                <p>📍 Vector: [{vector.x.toFixed(1)}, {vector.y.toFixed(1)}]</p>
                <p>📏 Magnitude: {currentMagnitude.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default VectorVisualizer;
