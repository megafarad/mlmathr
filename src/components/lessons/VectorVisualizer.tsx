import React, { useState, useMemo } from 'react';
import { GraphCanvas, type CanvasVector } from "@sirhc77/canvas-math-kit";

const width = 300;
const height = 300;
const scale = 15;
const maxX = Math.floor((width / 2) / scale);
const maxY = Math.floor((height / 2) / scale);

interface VectorVisualizerProps {
    onMagnitudeChange?: (magnitude: number) => void;
    snapToMagnitude?: number;
    snapTolerance?: number;
}

const VectorVisualizer: React.FC<VectorVisualizerProps> = ({
                                                               onMagnitudeChange,
                                                               snapToMagnitude,
                                                               snapTolerance = 0.3
                                                           }) => {
    const [vector, setVector] = useState<CanvasVector>({ x: 3, y: 3, color: 'blue', draggable: true, headStyle: 'both' });

    const vectors = useMemo(() => [vector], [vector]);

    const handleVectorsChange = (updated: CanvasVector[]) => {
        const [v] = updated;

        // Clamp to max bounds
        let x = Math.max(-maxX, Math.min(maxX, Math.round(v.x)));
        let y = Math.max(-maxY, Math.min(maxY, Math.round(v.y)));

        let magnitude = Math.sqrt(x ** 2 + y ** 2);

        // Apply magnitude snapping
        if (snapToMagnitude && Math.abs(magnitude - snapToMagnitude) < snapTolerance) {
            const scaleFactor = snapToMagnitude / magnitude;
            x = Math.round(x * scaleFactor);
            y = Math.round(y * scaleFactor);
            magnitude = Math.sqrt(x ** 2 + y ** 2);
        }

        const newVector = { ...v, x, y };
        setVector(newVector);
        onMagnitudeChange?.(magnitude);
    };

    const currentMagnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2);

    return (
        <div className="flex flex-col items-center space-y-4">
            <GraphCanvas
                width={width}
                height={height}
                scale={scale}
                vectors={vectors}
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
