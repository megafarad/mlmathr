import React, { useEffect, useRef, useState } from 'react';

interface EigenvectorVisualizerProps {
    onGoalAchieved?: () => void;
}


const width = 400;
const height = 400;
const origin = { x: width / 2, y: height / 2 };

const toCanvas = (x: number, y: number, scale: number) => ({
    x: origin.x + x * scale,
    y: origin.y - y * scale,
});

const applyMatrix = (matrix: number[][], v: number[]): number[] => [
    matrix[0][0] * v[0] + matrix[0][1] * v[1],
    matrix[1][0] * v[0] + matrix[1][1] * v[1],
];

const isEigenvector = (v: number[], Av: number[], epsilon = 0.005): boolean => {
    const [x1, y1] = v;
    const [x2, y2] = Av;
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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [matrix, setMatrix] = useState([
        [2, 1],
        [1, 2],
    ]);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const vectors: { v: number[]; Av: number[]; isEig: boolean }[] = [];
        let maxMag = 0;

        // Sample unit vectors and transform them
        for (let i = 0; i < 360; i += 5) {
            const angle = (i * Math.PI) / 180;
            const v = [Math.cos(angle), Math.sin(angle)];
            const Av = applyMatrix(matrix, v);
            const mag = Math.hypot(Av[0], Av[1]);
            maxMag = Math.max(maxMag, mag);
            vectors.push({ v, Av, isEig: isEigenvector(v, Av) });
        }

        const redCount = vectors.filter(v => v.isEig).length;

        if (onGoalAchieved && redCount >= 2 && redCount <= 4) {
            // We allow a small range (2–4) because directions ±v count as two
            onGoalAchieved();
        }

        const scale = Math.min(80, 160 / maxMag); // Dynamic scaling

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

        // Vectors
        vectors.forEach(({ v, Av, isEig }) => {
            const base = toCanvas(0, 0, scale);
            const vEnd = toCanvas(v[0], v[1], scale);
            const AvEnd = toCanvas(Av[0], Av[1], scale);

            // Original vector
            ctx.strokeStyle = isEig ? 'red' : 'blue';
            ctx.beginPath();
            ctx.moveTo(base.x, base.y);
            ctx.lineTo(vEnd.x, vEnd.y);
            ctx.stroke();

            // Transformed vector
            ctx.strokeStyle = isEig ? 'rgba(255,0,0,0.3)' : 'rgba(0,0,255,0.2)';
            ctx.beginPath();
            ctx.moveTo(base.x, base.y);
            ctx.lineTo(AvEnd.x, AvEnd.y);
            ctx.stroke();
        });
    }, [matrix, onGoalAchieved]);

    return (
        <div className="space-y-4">
            <canvas ref={canvasRef} width={width} height={height} className="border" />

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
