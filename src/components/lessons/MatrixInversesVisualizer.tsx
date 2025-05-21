import React, { useEffect, useRef, useState } from 'react';

interface MatrixInversesVisualizerProps {
    onGoalAchieved?: () => void;
}

const width = 400;
const height = 400;
const origin = { x: width / 2, y: height / 2 };
const scale = 40;

const toCanvas = (x: number, y: number) => ({
    x: origin.x + x * scale,
    y: origin.y - y * scale,
});

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

const MatrixInversesVisualizer: React.FC<MatrixInversesVisualizerProps> = ({ onGoalAchieved }) => {    const canvasRef = useRef<HTMLCanvasElement>(null);
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

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        // Grid
        ctx.strokeStyle = '#eee';
        for (let x = 0; x <= width; x += scale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y <= height; y += scale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Axes
        ctx.strokeStyle = '#aaa';
        ctx.beginPath();
        ctx.moveTo(0, origin.y);
        ctx.lineTo(width, origin.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(origin.x, 0);
        ctx.lineTo(origin.x, height);
        ctx.stroke();

        // Shape
        const getPoints = (): number[][] => {
            if (step === 'original') return square;
            if (step === 'afterA') return square.map(p => applyMatrix(matrix, p));
            if (step === 'afterInverse' && inverse)
                return square.map(p => applyMatrix(inverse, applyMatrix(matrix, p)));
            return square;
        };

        const points = getPoints();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
        ctx.beginPath();
        points.forEach(([x, y], i) => {
            const pt = toCanvas(x, y);
            if (i === 0) {
                ctx.moveTo(pt.x, pt.y);
            } else {
                ctx.lineTo(pt.x, pt.y);
            }
        });
        ctx.closePath();
        ctx.fill();
    }, [matrix, inverse, step]);

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
            <canvas ref={canvasRef} width={width} height={height} className="border" />

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
