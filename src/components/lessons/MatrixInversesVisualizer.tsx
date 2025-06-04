import React, { useEffect, useState } from 'react';
import {type Point} from "@sirhc77/canvas-math-kit/src/utils/canvasGraphUtils.ts";
import {drawParallelogram, GraphCanvas, toCanvas} from "@sirhc77/canvas-math-kit";

interface MatrixInversesVisualizerProps {
    onGoalAchieved?: () => void;
}

const width = 400;
const height = 400;
const scale = 40;

const applyMatrix = (matrix: number[][], point: number[]) => [
    matrix[0][0] * point[0] + matrix[0][1] * point[1],
    matrix[1][0] * point[0] + matrix[1][1] * point[1],
];

const invertMatrix = (m: number[][]): number[][] | null => {
    const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
    if (Math.abs(det) < 1e-8) return null;
    const invDet = 1 / det;
    return [
        [ m[1][1] * invDet, -m[0][1] * invDet],
        [-m[1][0] * invDet,  m[0][0] * invDet],
    ];
};

const square = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
];

const MatrixInversesVisualizer: React.FC<MatrixInversesVisualizerProps> = ({ onGoalAchieved }) => {
    const [matrix, setMatrix] = useState([
        [1, 1],
        [2, 3],
    ]);
    const [inverse, setInverse] = useState(invertMatrix([[1, 0], [0, 1]]));
    const [step, setStep] = useState<'original' | 'afterA' | 'afterInverse'>('original');
    const [goalFired, setGoalFired] = useState(false);

    useEffect(() => {
        setInverse(invertMatrix(matrix));
    }, [matrix]);

    const customDraw = (ctx: CanvasRenderingContext2D, origin: Point, scale: number) => {
        const getPoints = (): number[][] => {
            if (step === 'original') return square;
            if (step === 'afterA') return square.map(p => applyMatrix(matrix, p));
            if (step === 'afterInverse' && inverse)
                return square.map(p => applyMatrix(inverse, applyMatrix(matrix, p)));
            return square;
        };
        const points = getPoints();

        const p0 = toCanvas(points[0][0], points[0][1], origin, scale);
        const p1 = toCanvas(points[1][0], points[1][1], origin, scale);
        const p2 = toCanvas(points[2][0], points[2][1], origin, scale);
        const p3 = toCanvas(points[3][0], points[3][1], origin, scale);

        drawParallelogram(ctx, p0, p1, p2, p3, 'rgba(255, 0, 0, 0.4)');
    }

    useEffect(() => {
        if (goalFired || step !== 'afterInverse' || !inverse) return;

        // Target matrix A
        const target = [
            [2, 1],
            [1, 1],
        ];

        const isClose = (a: number[][], b: number[][], tol = 0.01) =>
            a.every((row, i) => row.every((val, j) => Math.abs(val - b[i][j]) < tol));

        const round = (v: number[]) => v.map(x => Math.round(x * 1000) / 1000);
        const original = square.map(round);
        const recovered = square.map(p => round(applyMatrix(inverse, applyMatrix(matrix, p))));
        const matchesShape = original.every((pt, i) =>
            pt.every((val, j) => Math.abs(val - recovered[i][j]) < 0.01)
        );

        if (isClose(matrix, target) && matchesShape) {
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [step, matrix, inverse, goalFired, onGoalAchieved]);
    return (
        <div className="space-y-4">
            <GraphCanvas width={width}
                         height={height}
                         scale={scale}
                         customDraw={customDraw} />

            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => setStep('original')}
                    className={`px-3 py-1 rounded ${step === 'original' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Original
                </button>
                <button
                    onClick={() => setStep('afterA')}
                    className={`px-3 py-1 rounded ${step === 'afterA' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    After A
                </button>
                <button
                    onClick={() => setStep('afterInverse')}
                    disabled={!inverse}
                    className={`px-3 py-1 rounded ${step === 'afterInverse' ? 'bg-blue-500 text-white' : 'bg-gray-200'} ${!inverse ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    After A⁻¹
                </button>
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

            {!inverse && (
                <div className="text-center text-red-600 text-sm">
                    ⚠️ This matrix is not invertible (det = 0)
                </div>
            )}
        </div>
    );
};

export default MatrixInversesVisualizer;
