import React, { useEffect, useState } from 'react';
import {type CanvasVector, GraphCanvas} from "@sirhc77/canvas-math-kit";

interface EigenvectorVisualizerProps {
    onGoalAchieved?: () => void;
}

interface UnitVector {
    v: CanvasVector;
    Av: CanvasVector;
    isEig: boolean;
}


const width = 400;
const height = 400;

const applyMatrix = (matrix: number[][], v: CanvasVector): CanvasVector => ({
    ...v,
    x: matrix[0][0] * v.x + matrix[0][1] * v.y,
    y: matrix[1][0] * v.x + matrix[1][1] * v.y,
});

const isEigenvector = (v: CanvasVector, Av: CanvasVector, epsilon = 0.005): boolean => {
    const {x: x1, y: y1} = v;
    const {x: x2, y: y2} = Av;
    const mag1 = Math.hypot(x1, y1);
    const mag2 = Math.hypot(x2, y2);
    if (mag1 === 0 || mag2 === 0) return false;

    // Normalize both vectors
    const nv1 = [x1 / mag1, y1 / mag1];
    const nv2 = [x2 / mag2, y2 / mag2];

    // Check directional alignment or exact opposite
    const dot = nv1[0] * nv2[0] + nv1[1] * nv2[1];
    return Math.abs(Math.abs(dot) - 1) < epsilon;
};

const EigenvectorVisualizer: React.FC<EigenvectorVisualizerProps> = ({ onGoalAchieved }) => {
    const [scale, setScale] = useState(40);
    const [unitVectors, setUnitVectors] = useState<UnitVector[]>([])
    const [matrix, setMatrix] = useState([
        [2, 1],
        [1, 2],
    ]);
    const [goalFired, setGoalFired] = useState(false);

    const displayVectors:  CanvasVector[] = [...unitVectors.map(v => ({ ...v.v, color: v.isEig ? 'red' : 'blue'})),
        ...unitVectors.map(v => ({ ...v.Av, color: v.isEig ? 'red' : 'blue'}))]

    useEffect(() => {
        const vectors: UnitVector[] = [];
        let maxMag = 0;

        // Sample unit vectors and transform them
        for (let i = 0; i < 360; i += 5) {
            const angle = (i * Math.PI) / 180;
            const v: CanvasVector = { x: Math.cos(angle), y: Math.sin(angle), color: 'blue', draggable: false,
                headStyle: 'none', width: 0.5};
            const Av: CanvasVector = applyMatrix(matrix, v);
            const mag = Math.hypot(Av.x, Av.y);
            maxMag = Math.max(maxMag, mag);
            vectors.push({ v, Av, isEig: isEigenvector(v, Av) });
        }

        setUnitVectors(vectors);

        const redCount = vectors.filter(v => v.isEig).length;

        if (onGoalAchieved && redCount >= 2 && redCount <= 4) {
            // We allow a small range (2–4) because directions ±v count as two
            setGoalFired(true);
            onGoalAchieved();
        }

        setScale(Math.min(80, 160 / maxMag));
    }, [matrix, onGoalAchieved, scale]);

    return (
        <div className="space-y-4">
            <GraphCanvas width={width}
                         height={height}
                         scale={scale}
                         vectors={displayVectors}
            />
            <div className="text-center text-sm text-gray-700">
                🔴 Red vectors are eigenvectors (direction stays the same)<br />
                🔵 Blue vectors change direction
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto text-sm">
                <div>
                    <h3 className="font-semibold mb-1">Matrix A</h3>
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
        </div>
    );
};

export default EigenvectorVisualizer;
