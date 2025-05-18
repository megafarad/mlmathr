import React, { useEffect, useRef, useState } from 'react';

const width = 400;
const height = 400;
const origin = { x: width / 2, y: height / 2 };
const baseVector = [1, 1];

const applyMatrix = (m: number[][], v: number[]) => [
    m[0][0] * v[0] + m[0][1] * v[1],
    m[1][0] * v[0] + m[1][1] * v[1],
];

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

const scaleDown = (v: number[], maxLength: number) => {
    const length = Math.hypot(v[0], v[1]);
    if (length > maxLength) {
        const scale = maxLength / length;
        return [v[0] * scale, v[1] * scale];
    }
    return v;
};

const MatrixTransformationOrderVisualizer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [matrixA, setMatrixA] = useState([
        [1, 1],
        [0, 1],
    ]);
    const [matrixB, setMatrixB] = useState([
        [1, 0],
        [1, 1],
    ]);

    const bThenA = applyMatrix(matrixA, applyMatrix(matrixB, baseVector));
    const aThenB = applyMatrix(matrixB, applyMatrix(matrixA, baseVector));
    const vectorsToMeasure = [baseVector, bThenA, aThenB];

    const maxMag = Math.max(...vectorsToMeasure.map((v) => Math.hypot(v[0], v[1])));
    const visualRadius = (Math.min(width, height) / 2) * 0.8;
    const dynamicScale = maxMag > 0 ? visualRadius / maxMag : 40;

    const isOutOfBounds = vectorsToMeasure.some(([x, y]) => {
        const canvasX = origin.x + x * dynamicScale;
        const canvasY = origin.y - y * dynamicScale;
        return canvasX < 0 || canvasX > width || canvasY < 0 || canvasY > height;
    });

    const ab = multiplyMatrices(matrixA, matrixB);
    const ba = multiplyMatrices(matrixB, matrixA);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, width, height);

        // Grid lines based on dynamic scale
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 1;
        const unitLimit = Math.ceil((Math.min(width, height) / 2) / dynamicScale);

        for (let i = -unitLimit; i <= unitLimit; i++) {
            const x = origin.x + i * dynamicScale;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();

            const y = origin.y - i * dynamicScale;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Axes
        ctx.beginPath();
        ctx.moveTo(0, origin.y);
        ctx.lineTo(width, origin.y);
        ctx.strokeStyle = '#aaa';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(origin.x, 0);
        ctx.lineTo(origin.x, height);
        ctx.stroke();

        const toCanvas = (x: number, y: number) => ({
            x: origin.x + x * dynamicScale,
            y: origin.y - y * dynamicScale,
        });

        const drawVec = (v: number[], color: string, label: string) => {
            const [vx, vy] = scaleDown(v, 8);
            const { x, y } = toCanvas(vx, vy);

            ctx.beginPath();
            ctx.moveTo(origin.x, origin.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Arrowhead
            const angle = Math.atan2(origin.y - y, x - origin.x);
            const size = 8;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - size * Math.cos(angle - 0.3), y + size * Math.sin(angle - 0.3));
            ctx.lineTo(x - size * Math.cos(angle + 0.3), y + size * Math.sin(angle + 0.3));
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();

            // Label
            ctx.fillStyle = color;
            ctx.font = '12px sans-serif';
            ctx.fillText(label, x + 5, y - 5);
        };

        drawVec(baseVector, 'gray', 'Original');
        drawVec(bThenA, 'green', 'A(Bv)');
        drawVec(aThenB, 'purple', 'B(Av)');
    }, [matrixA, matrixB, dynamicScale, bThenA, aThenB]);

    return (
        <div className="space-y-4">
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="border"
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
                    [{bThenA[0].toFixed(2)}, {bThenA[1].toFixed(2)}]
                </div>
                <div>
                    <span className="font-semibold text-purple-600">B(Av):</span>{' '}
                    [{aThenB[0].toFixed(2)}, {aThenB[1].toFixed(2)}]
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
