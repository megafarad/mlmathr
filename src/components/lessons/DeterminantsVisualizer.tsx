import React, { useEffect, useState } from 'react';
import { GraphCanvas, type CanvasParallelogram } from "@sirhc77/canvas-math-kit";

interface DeterminantsVisualizerProps {
    onGoalAchieved?: () => void;
}

const width = 400;
const height = 400;
const scale = 40;

const determinant = (m: number[][]) =>
    m[0][0] * m[1][1] - m[0][1] * m[1][0];


const DeterminantsVisualizer: React.FC<DeterminantsVisualizerProps> = ({ onGoalAchieved }) => {
    const [matrix, setMatrix] = useState([
        [1, 0],
        [0, 1],
    ]);
    const [det, setDet] = useState(1);
    const [goalFired, setGoalFired] = useState(false);

    const unitParallelogram: CanvasParallelogram = {
      vectorA: {x: 1, y: 0},
      vectorB: {x: 0, y: 1},
      fillColor: 'rgba(0, 0, 255, 0.2)'
    }

    const transformedParallelogram: CanvasParallelogram = {
        vectorA: {x: matrix[0][0], y: matrix[1][0]},
        vectorB: {x: matrix[0][1], y: matrix[1][1]},
        fillColor: 'rgba(255, 0, 0, 0.4)'
    }

    useEffect(() => {
        // Compute determinant
        const d = determinant(matrix);
        setDet(d);
    }, [matrix]);

    useEffect(() => {
        if (!goalFired && Math.abs(det) < 0.01) {
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [det, onGoalAchieved, goalFired]);

    return (
        <div className="space-y-4">
            <GraphCanvas width={width}
                         height={height}
                         scale={scale}
                         parallelograms={[unitParallelogram, transformedParallelogram]}
            />

            <div className="text-center text-sm text-gray-700">
                🔷 Blue: Original unit square | 🔴 Red: Transformed square
            </div>

            <div className="text-center text-md font-semibold">
                Determinant: {det.toFixed(2)}
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto text-sm">
                <div>
                    <h3 className="font-semibold mb-1">Matrix</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {matrix.map((row, r) =>
                            row.map((val, c) => (
                                <input
                                    key={`${r}-${c}`}
                                    type="number"
                                    value={val}
                                    disabled={goalFired}
                                    onChange={(e) => {
                                        let value = parseFloat(e.target.value);
                                        if (isNaN(value)) value = 0;
                                        value = Math.max(-5, Math.min(5, value));
                                        const newMatrix = [...matrix];
                                        newMatrix[r] = [...newMatrix[r]];
                                        newMatrix[r][c] = value;
                                        setMatrix(newMatrix);
                                    }}
                                    className="border px-2 py-1 w-16 text-center rounded"
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {Math.abs(det) < 0.01 && (
                <div className="text-center text-red-600 text-sm">
                    ⚠️ This matrix collapses the area to zero! (non-invertible)
                </div>
            )}
        </div>
    );
};

export default DeterminantsVisualizer;
