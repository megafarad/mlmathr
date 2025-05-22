import React, {useRef, useEffect, useState} from 'react';

const width = 400;
const height = 400;
const scale = 25;
const origin = { x: width / 2, y: height / 2 };

const toCanvas = (x: number, y: number) => ({
    x: origin.x + x * scale,
    y: origin.y - y * scale,
});

const toVector = (x: number, y: number) => ({
    x: (x - origin.x) / scale,
    y: (origin.y - y) / scale,
});

interface Props {
    onGoalAchieved?: () => void;
    matrix: number[][];
}

const NullColumnSpaceVisualizer: React.FC<Props> = ({ onGoalAchieved, matrix }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [vector, setVector] = useState([1, 1]);
    const [dragging, setDragging] = useState(false);
    const [goalFired, setGoalFired] = useState(false);

    const applyMatrix = ([a, b]: number[], mat: number[][]) => [
        mat[0][0] * a + mat[0][1] * b,
        mat[1][0] * a + mat[1][1] * b,
    ];

    const transformed = applyMatrix(vector, matrix);
    const isZero = transformed.every((val) => Math.abs(val) < 0.01);

    const zeroVector = vector.every(val => val === 0);

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

        const drawArrow = (vec: number[], color: string, drawCircle = false) => {
            const from = toCanvas(0, 0);
            const to = toCanvas(vec[0], vec[1]);
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const angle = Math.atan2(dy, dx);
            const headlen = 15;

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

            // Optional circle on head
            if (drawCircle) {
                ctx.beginPath();
                ctx.arc(to.x, to.y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.fill();
                ctx.stroke();
            }
        };

        drawArrow(vector, 'blue', true); // original
        drawArrow(transformed, 'red'); // transformed
    }, [vector, matrix, transformed]);

    useEffect(() => {
        if (!goalFired && isZero && !zeroVector) {
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [isZero, goalFired, onGoalAchieved, zeroVector]);

    const handleMouseDown = () => {
        setDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging || goalFired) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const { x, y } = toVector(e.clientX - rect.left, e.clientY - rect.top);
        setVector([Math.round(x * 2) / 2, Math.round(y * 2) / 2]);
    };

    const handleMouseUp = () => setDragging(false);

    return (
        <div className="space-y-4">
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="border"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            />

            <div className="text-sm text-center space-y-1">
                <div>🟦 Original vector: ({vector[0]}, {vector[1]})</div>
                <div>🟥 Transformed: ({transformed[0].toFixed(2)}, {transformed[1].toFixed(2)})</div>
            </div>
        </div>
    );
};

export default NullColumnSpaceVisualizer;
