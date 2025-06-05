import React, { useEffect, useState } from 'react';
import {type CanvasVector, GraphCanvas} from "@sirhc77/canvas-math-kit";

interface Props {
    onGoalAchieved?: () => void;
}


const width = 400;
const height = 400;
const origin = { x: width / 2, y: height / 2 };
const baseVector: CanvasVector = { x: 1, y: 1, color: 'gray', headStyle: 'arrow', label: 'Original'};

const applyMatrix = (m: number[][], v: CanvasVector, color: string, label: string): CanvasVector => ({
    x: m[0][0] * v.x + m[0][1] * v.y,
    y: m[1][0] * v.x + m[1][1] * v.y,
    color: color,
    label: label
});

const multiplyMatrices = (a: number[][], b: number[][]): number[][] => [
    [
        a[0][0] * b[0][0] + a[0][1] * b[1][0],
        a[0][0] * b[0][1] + a[0][1] * b[1][1],
    ],
    [
        a[1][0] * b[0][0] + a[1][1] * b[1][0],
        a[1][0] * b[0][1] + a[1][1] * b[1][1],
    ],
];
const MatrixTransformationOrderVisualizer: React.FC<Props> = ({ onGoalAchieved }) => {
    const [matrixA, setMatrixA] = useState([
        [1, 1],
        [0, 1],
    ]);
    const [matrixB, setMatrixB] = useState([
        [1, 0],
        [1, 1],
    ]);

    const [goalFired, setGoalFired] = useState(false);

    const bThenA = applyMatrix(matrixA, applyMatrix(matrixB, baseVector, 'green', 'Bv'), 'green', 'A(Bv)');
    const aThenB = applyMatrix(matrixB, applyMatrix(matrixA, baseVector, 'purple', 'Av'), 'purple', 'B(Av)');
    const vectorsToMeasure = [baseVector, bThenA, aThenB];

    const maxMag = Math.max(...vectorsToMeasure.map((v) => Math.hypot(v.x, v.y)));
    const visualRadius = (Math.min(width, height) / 2);
    const dynamicScale = maxMag > 0 ? visualRadius / maxMag : 40;

    const isOutOfBounds = vectorsToMeasure.some(({x, y}) => {
        const canvasX = origin.x + x * dynamicScale;
        const canvasY = origin.y - y * dynamicScale;
        return canvasX < 0 || canvasX > width || canvasY < 0 || canvasY > height;
    });

    const ab = multiplyMatrices(matrixA, matrixB);
    const ba = multiplyMatrices(matrixB, matrixA);

    useEffect(() => {
        const matricesAreEqual = (m1: number[][], m2: number[][], tol = 0.01) => {
            return m1.every((row, r) =>
                row.every((val, c) => Math.abs(val - m2[r][c]) < tol)
            );
        };

        if (matricesAreEqual(ab, ba)) {
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [ab, ba, onGoalAchieved]);


    return (
        <div className="space-y-4">
            <GraphCanvas width={width}
                         height={height}
                         scale={dynamicScale}
                         vectors={vectorsToMeasure}
            />

            {isOutOfBounds && (
                <div className="text-center text-red-600 text-sm">
                    ⚠️ Some vectors may be clipped or scaled down to fit. Try using smaller matrix values for clearer comparisons.
                </div>
            )}

            <div className="text-sm text-gray-700 text-center">
                🟢 A(Bv) → 🟣 B(Av)
            </div>
            <div className="text-center text-sm text-gray-600">
                <p><span className="text-gray-600">Gray</span>: Original vector</p>
                <p><span className="text-green-600">Green</span>: Apply B, then A</p>
                <p><span className="text-purple-600">Purple</span>: Apply A, then B</p>
            </div>

            <div className="text-sm text-center text-gray-700 space-y-1">
                <div>
                    <span className="font-semibold text-green-600">A(Bv):</span>{' '}
                    [{bThenA.x.toFixed(2)}, {bThenA.y.toFixed(2)}]
                </div>
                <div>
                    <span className="font-semibold text-purple-600">B(Av):</span>{' '}
                    [{aThenB.x.toFixed(2)}, {aThenB.y.toFixed(2)}]
                </div>
            </div>

            <div className="text-sm text-center text-gray-700 space-y-1 mt-4">
                <div>
                    <span className="font-semibold">A · B:</span>{' '}
                    [
                    [{ab[0][0].toFixed(2)}, {ab[0][1].toFixed(2)}],{' '}
                    [{ab[1][0].toFixed(2)}, {ab[1][1].toFixed(2)}]
                    ]
                </div>
                <div>
                    <span className="font-semibold">B · A:</span>{' '}
                    [
                    [{ba[0][0].toFixed(2)}, {ba[0][1].toFixed(2)}],{' '}
                    [{ba[1][0].toFixed(2)}, {ba[1][1].toFixed(2)}]
                    ]
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto text-sm">
                <div>
                    <h3 className="font-semibold mb-1">Matrix A (applied second in A·B)</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {matrixA.map((row, r) =>
                            row.map((val, c) => (
                                <input
                                    key={`A-${r}-${c}`}
                                    type="number"
                                    value={val}
                                    disabled={goalFired}
                                    onChange={(e) => {
                                        const newMatrix = [...matrixA];
                                        newMatrix[r] = [...newMatrix[r]];
                                        newMatrix[r][c] = parseFloat(e.target.value);
                                        setMatrixA(newMatrix);
                                    }}
                                    className="border px-2 py-1 w-16 text-center rounded"
                                />
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Matrix B (applied first in A·B)</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {matrixB.map((row, r) =>
                            row.map((val, c) => (
                                <input
                                    key={`B-${r}-${c}`}
                                    type="number"
                                    value={val}
                                    disabled={goalFired}
                                    onChange={(e) => {
                                        const newMatrix = [...matrixB];
                                        newMatrix[r] = [...newMatrix[r]];
                                        newMatrix[r][c] = parseFloat(e.target.value);
                                        setMatrixB(newMatrix);
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

export default MatrixTransformationOrderVisualizer;
