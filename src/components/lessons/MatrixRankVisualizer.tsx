import React, { useEffect, useRef, useState } from 'react';

interface MatrixRankVisualizerProps {
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

const computeRank = (m: number[][]) => {
    const [a, b] = m[0];
    const [c, d] = m[1];
    const col1 = [a, c];
    const col2 = [b, d];
    const isZero = ([x, y]: number[]) => x === 0 && y === 0;
    const det = a * d - b * c;
    if (isZero(col1) && isZero(col2)) return 0;
    if (Math.abs(det) < 1e-8) return 1;
    return 2;
};

const MatrixRankVisualizer: React.FC<MatrixRankVisualizerProps> = ({ onGoalAchieved }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [matrix, setMatrix] = useState([
        [1, 0],
        [0, 1],
    ]);
    const [rank, setRank] = useState(2);
    const [goalFired, setGoalFired] = useState(false);

    /** fire gate when rank == 1 */
    useEffect(() => {
        if (!goalFired && rank === 1) {
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [rank, goalFired, onGoalAchieved]);

    // … existing canvas–drawing effect …
    useEffect(() => {
        setRank(computeRank(matrix));
        // drawing code unchanged …
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
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
        ctx.strokeStyle = '#aaa';
        ctx.beginPath();
        ctx.moveTo(0, origin.y);
        ctx.lineTo(width, origin.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(origin.x, 0);
        ctx.lineTo(origin.x, height);
        ctx.stroke();
        const drawArrow = (v: number[], color: string) => {
            const head = toCanvas(v[0], v[1]);
            const base = toCanvas(0, 0);
            const dx = head.x - base.x;
            const dy = head.y - base.y;
            const len = Math.hypot(dx, dy);
            if (len === 0) return;
            const angle = Math.atan2(dy, dx);
            const headlen = 10;
            ctx.beginPath();
            ctx.moveTo(base.x, base.y);
            ctx.lineTo(head.x, head.y);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(head.x, head.y);
            ctx.lineTo(
                head.x - headlen * Math.cos(angle - Math.PI / 6),
                head.y - headlen * Math.sin(angle - Math.PI / 6)
            );
            ctx.lineTo(
                head.x - headlen * Math.cos(angle + Math.PI / 6),
                head.y - headlen * Math.sin(angle + Math.PI / 6)
            );
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        };
        const [a, b] = matrix[0];
        const [c, d] = matrix[1];
        drawArrow([a, c], 'blue');
        drawArrow([b, d], 'green');
    }, [matrix]);

    return (
        <div className="space-y-4">
            <canvas ref={canvasRef} width={width} height={height} className="border" />

            <div className="text-center text-md font-semibold">Rank: {rank}</div>

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
                                        const v = parseFloat(e.target.value) || 0;
                                        const m = matrix.map((row) => [...row]);
                                        m[r][c] = v;
                                        setMatrix(m);
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
