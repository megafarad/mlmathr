import React, { useRef, useEffect, useState } from 'react';

const width = 400;
const height = 400;
const scale = 40;
const origin = { x: width / 2, y: height / 2 };

const toCanvas = (x: number, y: number) => ({
    x: origin.x + x * scale,
    y: origin.y - y * scale,
});

const toVector = (x: number, y: number) => ({
    x: (x - origin.x) / scale,
    y: (origin.y - y) / scale,
});

const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1];
const scaleVec = (v: number[], s: number) => [v[0] * s, v[1] * s];
const proj = (a: number[], b: number[]) => {
    const factor = dot(a, b) / dot(a, a);
    return scaleVec(a, factor);
};

const formatVec = (v: number[]) => `[${v[0]}, ${v[1]}]`;

const ProjectionVisualizer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [a, setA] = useState([2, 1]);
    const [b, setB] = useState([1, 2]);
    const [dragging, setDragging] = useState<'a' | 'b' | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

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
        ctx.beginPath();
        ctx.moveTo(0, origin.y);
        ctx.lineTo(width, origin.y);
        ctx.strokeStyle = '#aaa';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(origin.x, 0);
        ctx.lineTo(origin.x, height);
        ctx.stroke();

        const drawArrow = (vec: number[], color: string, draggable = true) => {
            const { x, y } = toCanvas(vec[0], vec[1]);
            ctx.beginPath();
            ctx.moveTo(origin.x, origin.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
            if (draggable) {
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
        };

        const p = proj(a, b);
        drawArrow(a, 'blue');
        drawArrow(b, 'green');
        drawArrow(p, 'red', false);

        // Dashed line from b to proj
        const bCanvas = toCanvas(b[0], b[1]);
        const pCanvas = toCanvas(p[0], p[1]);
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(bCanvas.x, bCanvas.y);
        ctx.lineTo(pCanvas.x, pCanvas.y);
        ctx.strokeStyle = 'gray';
        ctx.stroke();
        ctx.setLineDash([]);
    }, [a, b]);

    const handleMouseDown = (e: React.MouseEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const pos = { x, y };

        const isNear = (vec: number[]) => {
            const end = toCanvas(vec[0], vec[1]);
            return Math.hypot(end.x - pos.x, end.y - pos.y) < 10;
        };

        if (isNear(a)) setDragging('a');
        else if (isNear(b)) setDragging('b');
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        const rect = canvasRef.current!.getBoundingClientRect();
        const { x, y } = toVector(e.clientX - rect.left, e.clientY - rect.top);
        const snapped = [Math.round(x), Math.round(y)];

        if (dragging === 'a') setA(snapped);
        else setB(snapped);
    };

    const dotAB = dot(a, b);
    const dotAA = dot(a, a);
    const factor = dotAA === 0 ? 0 : dotAB / dotAA;
    const projVec = proj(a, b);

    return (
        <div className="space-y-2">
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="border cursor-pointer"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => setDragging(null)}
                onMouseLeave={() => setDragging(null)}
            />
            <div className="text-center text-sm text-gray-600">
                🔴 Projection of <strong>b</strong> onto <strong>a</strong> shown in red.
            </div>
            <div className="text-center text-xs text-gray-500 mt-1">
                a · b = {dotAB.toFixed(2)}, a · a = {dotAA.toFixed(2)} ⇒ scale = {factor.toFixed(2)}
            </div>
            <div className="text-center text-xs text-gray-500">
                projₐ(b) = {factor.toFixed(2)} × {formatVec(a)} = <strong>{formatVec(projVec)}</strong>
            </div>
        </div>
    );
};

export default ProjectionVisualizer;
