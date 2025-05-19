import React, { useEffect, useRef, useState } from 'react';

const width = 400;
const height = 400;
const origin = { x: width / 2, y: height / 2 };
const scale = 40;

const toCanvas = (x: number, y: number, scaleFactor = scale) => ({
    x: origin.x + x * scaleFactor,
    y: origin.y - y * scaleFactor,
});

const applyMatrix = (matrix: number[][], point: number[]) => [
    matrix[0][0] * point[0] + matrix[0][1] * point[1],
    matrix[1][0] * point[0] + matrix[1][1] * point[1],
];

const determinant = (m: number[][]) =>
    m[0][0] * m[1][1] - m[0][1] * m[1][0];

const square = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
];

const DeterminantsVisualizer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [matrix, setMatrix] = useState([
        [1, 0],
        [0, 1],
    ]);
    const [det, setDet] = useState(1);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        // Draw background grid
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

        // Draw original unit square
        ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
        ctx.beginPath();
        square.forEach(([x, y], i) => {
            const pt = toCanvas(x, y);
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        ctx.fill();

        // Draw transformed square
        ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
        ctx.beginPath();
        square.forEach(([x, y], i) => {
            const [tx, ty] = applyMatrix(matrix, [x, y]);
            const pt = toCanvas(tx, ty);
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        ctx.fill();

        // Compute determinant
        const d = determinant(matrix);
        setDet(d);
    }, [matrix]);

    return (
        <div className="space-y-4">
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="border"
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
