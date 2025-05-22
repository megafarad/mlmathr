import React, { useRef, useEffect, useState } from 'react';

type Point = { x: number; y: number };

const width = 400;
const height = 400;
const scale = 40;
const origin = { x: width / 2, y: height / 2 };

const toCanvasCoords = (x: number, y: number) => ({
    x: origin.x + x * scale,
    y: origin.y - y * scale,
});

const toVectorCoords = (x: number, y: number) => ({
    x: (x - origin.x) / scale,
    y: (origin.y - y) / scale,
});

const areCollinear = (v1: number[], v2: number[]) =>
    v1[0] * v2[1] === v1[1] * v2[0];

interface SpanBasisVisualizerProps {
    onGoalAchieved?: () => void;
}

const SpanBasisDimensionVisualizer: React.FC<SpanBasisVisualizerProps> = ({ onGoalAchieved }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [v1, setV1] = useState([1, 1]);
    const [v2, setV2] = useState([2, 2]);
    const [dragging, setDragging] = useState<'v1' | 'v2' | null>(null);
    const [goalFired, setGoalFired] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        // Draw grid
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

        const drawArrow = (vec: number[], color: string) => {
            const { x, y } = toCanvasCoords(vec[0], vec[1]);
            ctx.beginPath();
            ctx.moveTo(origin.x, origin.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();

            ctx.fillStyle = color;
            ctx.font = '12px sans-serif';
            ctx.fillText(`[${vec[0].toFixed(1)}, ${vec[1].toFixed(1)}]`, x + 5, y - 5);
        };

        const drawSpan = (v1: number[], v2: number[]) => {
            if (areCollinear(v1, v2)) {
                ctx.beginPath();
                ctx.moveTo(origin.x - v1[0] * scale * 10, origin.y + v1[1] * scale * 10);
                ctx.lineTo(origin.x + v1[0] * scale * 10, origin.y - v1[1] * scale * 10);
                ctx.strokeStyle = 'rgba(255,0,0,0.2)';
                ctx.lineWidth = 4;
                ctx.stroke();
            } else {
                const a = toCanvasCoords(v1[0], v1[1]);
                const b = toCanvasCoords(v2[0], v2[1]);
                const c = toCanvasCoords(v1[0] + v2[0], v1[1] + v2[1]);

                ctx.fillStyle = 'rgba(255,0,0,0.2)';
                ctx.beginPath();
                ctx.moveTo(origin.x, origin.y);
                ctx.lineTo(a.x, a.y);
                ctx.lineTo(c.x, c.y);
                ctx.lineTo(b.x, b.y);
                ctx.closePath();
                ctx.fill();
            }
        };

        // Draw axes
        ctx.beginPath();
        ctx.moveTo(0, origin.y);
        ctx.lineTo(width, origin.y);
        ctx.strokeStyle = '#aaa';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(origin.x, 0);
        ctx.lineTo(origin.x, height);
        ctx.stroke();

        drawSpan(v1, v2);
        drawArrow(v1, 'blue');
        drawArrow(v2, 'green');
    }, [v1, v2]);

    useEffect(() => {
        const dependent = areCollinear(v1, v2);
        if (!dependent && !goalFired) {
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [v1, v2, goalFired, onGoalAchieved]);

    const handleMouseDown = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const endV1 = toCanvasCoords(v1[0], v1[1]);
        const endV2 = toCanvasCoords(v2[0], v2[1]);

        const dist = (p: Point, q: Point) =>
            Math.hypot(p.x - q.x, p.y - q.y);

        if (dist({ x, y }, endV1) < 10) setDragging('v1');
        else if (dist({ x, y }, endV2) < 10) setDragging('v2');
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const { x: vx, y: vy } = toVectorCoords(x, y);
        const snapped = [Math.round(vx), Math.round(vy)];

        if (dragging === 'v1') setV1(snapped);
        else if (dragging === 'v2') setV2(snapped);
    };

    const handleMouseUp = () => setDragging(null);

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="border cursor-pointer"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            />
            <div className="text-center mt-2 font-semibold text-sm">
                {areCollinear(v1, v2)
                    ? '❌ Vectors are linearly dependent (collinear)'
                    : '✅ Vectors are linearly independent'}
            </div>
        </div>
    );
};

export default SpanBasisDimensionVisualizer;
