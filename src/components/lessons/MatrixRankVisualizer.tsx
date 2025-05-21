import React, { useEffect, useRef, useState } from 'react';

const width = 400;
const height = 400;
const origin = { x: width / 2, y: height / 2 };
const scale = 40;

const toCanvas = (x: number, y: number) => ({
    x: origin.x + x * scale,
    y: origin.y - y * scale,
});

const drawArrow = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
    const headlen = 10;
    const from = toCanvas(0, 0);
    const to = toCanvas(x, y);
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(to.x - headlen * Math.cos(angle - Math.PI / 6), to.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(to.x - headlen * Math.cos(angle + Math.PI / 6), to.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(to.x, to.y);
    ctx.fillStyle = color;
    ctx.fill();
};

const computeRank = (matrix: number[][]) => {
    const [a, b] = matrix[0];
    const [c, d] = matrix[1];

    const col1 = [a, c];
    const col2 = [b, d];

    const isZero = (v: number[]) => v[0] === 0 && v[1] === 0;
    const isScalarMultiple = (v1: number[], v2: number[]) =>
        !isZero(v1) && !isZero(v2) && Math.abs(v1[0] * v2[1] - v1[1] * v2[0]) < 1e-8;

    if (isZero(col1) && isZero(col2)) return 0;
    if (isScalarMultiple(col1, col2)) return 1;
    return 2;
};

const MatrixRankVisualizer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [matrix, setMatrix] = useState([
        [1, 0],
        [0, 1],
    ]);
    const [rank, setRank] = useState(2);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const [a, b] = matrix[0];
        const [c, d] = matrix[1];

        const col1 = [a, c];
        const col2 = [b, d];

        setRank(computeRank(matrix));

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

        drawArrow(ctx, col1[0], col1[1], 'blue');
        drawArrow(ctx, col2[0], col2[1], 'green');
    }, [matrix]);

    return (
        <div className="space-y-4">
            <canvas ref={canvasRef} width={width} height={height} className="border" />

            <div className="text-center text-md font-semibold">
                Rank: {rank}
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

export default MatrixRankVisualizer;
