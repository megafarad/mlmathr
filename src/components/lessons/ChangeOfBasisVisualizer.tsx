import React, {useEffect, useState} from 'react';
import {type CanvasVector, GraphCanvas} from "@sirhc77/canvas-math-kit";

const width = 400;
const height = 400;
const scale = 40;

const invert2x2 = (a: CanvasVector[]): CanvasVector[] | null => {
    const [basis0, basis1] = a;
    const det = basis0.x * basis1.y - basis0.y * basis1.x;
    if (Math.abs(det) < 1e-8) return null;
    const invDet = 1 / det;
    return [
        {...basis0, x: basis1.y * invDet, y: -basis1.x * invDet},
        {...basis1, x: -basis0.y * invDet, y: basis0.x * invDet},
    ];
};

const applyMatrix = (matrix: CanvasVector[], v: CanvasVector): number[] => [
    matrix[0].x * v.x + matrix[0].y * v.y,
    matrix[1].x * v.x + matrix[1].y * v.y,
];

interface Props {
    onGoalAchieved?: () => void;
}

const ChangeOfBasisVisualizer: React.FC<Props> = ({ onGoalAchieved }) => {
    const [basis, setBasis] = useState<CanvasVector[]>([
        { x: 1, y: 0, color: 'green', draggable: false },
        { x: 0, y: 1, color: 'purple', draggable: false }
    ]);

    const inputBasis = [[basis[0].x, basis[1].x], [basis[0].y, basis[1].y]];

    const targetVector: CanvasVector = { x: 2, y: 1, color: 'blue', draggable: false}; // Fixed target vector
    const [goalFired, setGoalFired] = useState(false);

    const invBasis = invert2x2(basis);
    const coordsInNewBasis = invBasis ? applyMatrix(invBasis, targetVector) : null;

    useEffect(() => {
        const isClose = (v1: number[], v2: number[], tol = 0.1) =>
            Math.abs(v1[0] - v2[0]) < tol && Math.abs(v1[1] - v2[1]) < tol;

        if (!goalFired && coordsInNewBasis && isClose(coordsInNewBasis, [1, 0])) {
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [coordsInNewBasis, onGoalAchieved, goalFired]);

    return (
        <div className="space-y-4">
            <GraphCanvas width={width}
                         height={height}
                         scale={scale}
                         vectors={[targetVector, basis[0], basis[1]]}
            />

            <div className="text-center text-sm text-gray-700 space-y-1">
                <div>🟩 Green = First basis vector</div>
                <div>🟪 Purple = Second basis vector</div>
                <div>🟦 Blue = Vector in standard basis: ({targetVector.x}, {targetVector.y})</div>
                {coordsInNewBasis ? (
                    <div>📐 Coordinates in new basis: ({coordsInNewBasis[0].toFixed(2)}, {coordsInNewBasis[1].toFixed(2)})</div>
                ) : (
                    <div className="text-red-600">⚠️ Basis not invertible</div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto text-sm">
                <div>
                    <h3 className="font-semibold mb-1">Basis Vectors</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {inputBasis.map((row, r) =>
                            row.map((val, c) =>
                                <input
                                    key={`${r}-${c}`}
                                    type="number"
                                    value={val}
                                    onChange={(e) => {
                                        let value = parseFloat(e.target.value);
                                        if (isNaN(value)) value = 0;
                                        const newBasis = [...basis];
                                        if (r === 0){
                                            if (c === 0) {
                                                newBasis[0] = {...newBasis[0], x: value};
                                            } else {
                                                newBasis[1] = {...newBasis[1], x: value};
                                            }
                                        } else {
                                            if (c === 0) {
                                                newBasis[0] = {...newBasis[0], y: value};
                                            } else {
                                                newBasis[1] = {...newBasis[1], y: value};
                                            }
                                        }
                                        setBasis(newBasis);
                                    }}
                                    className="border px-2 py-1 w-16 text-center rounded"
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeOfBasisVisualizer;
