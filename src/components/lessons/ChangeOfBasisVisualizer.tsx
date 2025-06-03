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

const DEFAULT_TARGET_VECTOR: CanvasVector = { x: 2, y: 1, color: 'blue', draggable: false }; // Fixed target vector

const areCoordinatesClose = (v1: number[], v2: number[], tolerance = 0.1): boolean => {
    return Math.abs(v1[0] - v2[0]) < tolerance && Math.abs(v1[1] - v2[1]) < tolerance;
};

const ChangeOfBasisVisualizer: React.FC<Props> = ({ onGoalAchieved }) => {
    const [basis, setBasis] = useState<CanvasVector[]>([
        { x: 1, y: 0, color: 'green', draggable: false },
        { x: 0, y: 1, color: 'purple', draggable: false }
    ]);

    const [goalFired, setGoalFired] = useState(false);

    const inverseBasis = invert2x2(basis);
    const newBasisCoords = inverseBasis ? applyMatrix(inverseBasis, DEFAULT_TARGET_VECTOR) : null;

    useEffect(() => {
        if (!goalFired && newBasisCoords && areCoordinatesClose(newBasisCoords, [1, 0])) {
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [newBasisCoords, onGoalAchieved, goalFired]);

    const handleBasisChange = (row: number, col: number, value: number) => {
        const parsedValue = isNaN(value) ? 0 : value;
        setBasis(prevBasis => {
            const updatedBasis = [...prevBasis];
            updatedBasis[row] = {
                ...updatedBasis[row],
                [col === 0 ? 'x' : 'y']: parsedValue
            };
            return updatedBasis;
        });
    };

    return (
        <div className="space-y-4">
            <GraphCanvas
                width={width}
                height={height}
                scale={scale}
                vectors={[DEFAULT_TARGET_VECTOR, basis[0], basis[1]]}
            />
            <div className="text-center text-sm text-gray-700 space-y-1">
                <div>🟩 Green = First basis vector</div>
                <div>🟪 Purple = Second basis vector</div>
                <div>🟦 Blue = Vector in standard basis: ({DEFAULT_TARGET_VECTOR.x}, {DEFAULT_TARGET_VECTOR.y})</div>
                {newBasisCoords ? (
                    <div>📐 Coordinates in new basis: ({newBasisCoords[0].toFixed(2)}, {newBasisCoords[1].toFixed(2)})</div>
                ) : (
                    <div className="text-red-600">⚠️ Basis not invertible</div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto text-sm">
                <div>
                    <h3 className="font-semibold mb-1">Basis Vectors</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {[0, 1].map(row =>
                            [0, 1].map(col => (
                                <input
                                    key={`${row}-${col}`}
                                    type="number"
                                    value={row === 0 ? basis[col].x : basis[col].y}
                                    onChange={(e) =>
                                        handleBasisChange(
                                            col,
                                            row,
                                            parseFloat(e.target.value)
                                        )
                                    }
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

export default ChangeOfBasisVisualizer;