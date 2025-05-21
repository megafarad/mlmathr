import React, { useEffect, useRef, useState } from 'react';

const width = 400;
const height = 400;
const origin = { x: width / 2, y: height / 2 };
const scale = 40;

const toCanvas = (x: number, y: number) => ({
    x: origin.x + x * scale,
    y: origin.y - y * scale,
});

const drawArrow = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string
) => {
    const headlen = 10;
    const from = toCanvas(0, 0);
    const to = toCanvas(x, y);
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);

    ctx.setLineDash([]);
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

const invert2x2 = (a: number[][]): number[][] | null => {
    const [[a11, a12], [a21, a22]] = a;
    const det = a11 * a22 - a12 * a21;
    if (Math.abs(det) < 1e-8) return null;
    const invDet = 1 / det;
    return [
        [ a22 * invDet, -a12 * invDet],
        [-a21 * invDet,  a11 * invDet],
    ];
};

const applyMatrix = (matrix: number[][], v: number[]): number[] => [
    matrix[0][0] * v[0] + matrix[0][1] * v[1],
    matrix[1][0] * v[0] + matrix[1][1] * v[1],
];

const ChangeOfBasisVisualizer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [basis, setBasis] = useState([
        [1, 0],
        [0, 1],
    ]);

    const [vector, setVector] = useState([2, 1]);

    const invBasis = invert2x2(basis);
    const coordsInNewBasis = invBasis ? applyMatrix(invBasis, vector) : null;

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

        // Draw vectors
        drawArrow(ctx, basis[0][0], basis[1][0], 'green');   // Basis 1
        drawArrow(ctx, basis[0][1], basis[1][1], 'purple');  // Basis 2
        drawArrow(ctx, vector[0], vector[1], 'blue');        // Vector
    }, [basis, vector]);

    return (
        <div className="space-y-4">
            <canvas ref={canvasRef} width={width} height={height} className="border" />

            <div className="text-center text-sm text-gray-700 space-y-1">
                <div>🟩 Green = First basis vector</div>
                <div>🟪 Purple = Second basis vector</div>
                <div>🟦 Blue = Vector in standard basis: ({vector[0]}, {vector[1]})</div>
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
                        {basis.map((row, r) =>
                            row.map((val, c) => (
                                <input
                                    key={`${r}-${c}`}
                                    type="number"
                                    value={val}
                                    onChange={(e) => {
                                        let value = parseFloat(e.target.value);
                                        if (isNaN(value)) value = 0;
                                        const newBasis = [...basis];
                                        newBasis[r] = [...newBasis[r]];
                                        newBasis[r][c] = value;
                                        setBasis(newBasis);
                                    }}
                                    className="border px-2 py-1 w-16 text-center rounded"
                                />
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">Vector</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {vector.map((val, i) => (
                            <input
                                key={i}
                                type="number"
                                value={val}
                                onChange={(e) => {
                                    let value = parseFloat(e.target.value);
                                    if (isNaN(value)) value = 0;
                                    const newVec = [...vector];
                                    newVec[i] = value;
                                    setVector(newVec);
                                }}
                                className="border px-2 py-1 w-16 text-center rounded"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeOfBasisVisualizer;
