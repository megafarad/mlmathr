import React, { useState, useEffect, useMemo } from 'react';
import {type CanvasVector, GraphCanvas} from "@sirhc77/canvas-math-kit";

interface Props {
    onGoalAchieved?: () => void;
}

const MatrixTransformationsVisualizer: React.FC<Props> = ({ onGoalAchieved }) => {
    const [matrix, setMatrix] = useState([
        [2, 0],
        [0, 1],
    ]);
    const [vector, setVector] = useState<CanvasVector>({ x: 1, y: 1, color: 'blue', draggable: true, headStyle: 'both'});
    const [goalFired, setGoalFired] = useState(false);

    const width = 500;
    const height = 500;
    const scale = 50;
    const transformed: CanvasVector = useMemo(() => ({
        x: matrix[0][0] * vector.x + matrix[0][1] * vector.y,
        y: matrix[1][0] * vector.x + matrix[1][1] * vector.y,
        color: 'green',
        draggable: false,
        headStyle: 'arrow',
    }), [matrix, vector]);

    useEffect(() => {
        const isClose = (a: number, b: number, tol = 0.1) => Math.abs(a - b) < tol;

        if (
            !goalFired &&
            vector.x === 1 &&
            vector.y === 1 &&
            isClose(transformed.x, 3) &&
            isClose(transformed.y, 2)
        ) {
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [vector, transformed, goalFired, onGoalAchieved]);

    return (
        <div className="space-y-4">
            <GraphCanvas width={width}
                         height={height}
                         scale={scale}
                         snap={1}
                         vectors={[vector, transformed]}
                         onVectorsChange={vectors => {
                             setVector(vectors[0]);
                         }}
            />
            <div className="text-sm text-gray-700">
                Vector: ({vector.x}, {vector.y})
            </div>
            <div className="text-sm text-gray-700">
                Transformed: ({transformed.x.toFixed(2)}, {transformed.y.toFixed(2)})
            </div>

            {/* Matrix Controls */}
            <div className="grid grid-cols-2 gap-2 w-40">
                {matrix.map((row, i) =>
                    row.map((_val, j) => (
                        <input
                            key={`${i}-${j}`}
                            type="number"
                            value={matrix[i][j]}
                            onChange={(e) => {
                                const newMatrix = [...matrix];
                                newMatrix[i][j] = parseFloat(e.target.value);
                                setMatrix(newMatrix);
                            }}
                            className="border px-2 py-1 rounded w-full"
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MatrixTransformationsVisualizer;
