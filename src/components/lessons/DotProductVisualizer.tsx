import React, { useState } from 'react';

const width = 300;
const height = 300;
const origin = { x: width / 2, y: height / 2 };
const scale = 15; // pixels per unit

const DotProductVisualizer: React.FC = () => {
    const [vecA, setVecA] = useState({ x: 2, y: 3 });
    const [vecB, setVecB] = useState({ x: -1, y: 2 });

    const dotProduct = (a: typeof vecA, b: typeof vecB) => a.x * b.x + a.y * b.y;
    const magnitude = (v: typeof vecA) => Math.sqrt(v.x ** 2 + v.y ** 2);

    const angle = () => {
        const dot = dotProduct(vecA, vecB);
        const magA = magnitude(vecA);
        const magB = magnitude(vecB);
        const cosTheta = dot / (magA * magB);
        return Math.acos(Math.max(-1, Math.min(1, cosTheta))) * (180 / Math.PI);
    };

    const angleDeg = angle().toFixed(1);
    const dot = dotProduct(vecA, vecB).toFixed(2);
    const label =
        Math.abs(Number(dot)) < 1 ? 'Perpendicular' :
            Number(dot) > 0 ? 'Aligned' : 'Opposite';

    const maxX = Math.floor(width / (2 * scale));
    const maxY = Math.floor(height / (2 * scale));

    const handleDrag = (setVec: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) =>
        (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
            const bounds = (e.target as SVGElement).ownerSVGElement!.getBoundingClientRect();

            const onMouseMove = (moveEvent: MouseEvent) => {
                const x = moveEvent.clientX - bounds.left;
                const y = moveEvent.clientY - bounds.top;

                const snapped = {
                    x: Math.max(-maxX, Math.min(maxX, Math.round((x - origin.x) / scale))),
                    y: Math.max(-maxY, Math.min(maxY, Math.round((origin.y - y) / scale))) // flip y
                };

                setVec(snapped);
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

    const drawVector = (vec: { x: number; y: number }, color: string, onDrag: (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => void) => {
        const x = origin.x + vec.x * scale;
        const y = origin.y - vec.y * scale;

        return (
            <>
                <line
                    x1={origin.x}
                    y1={origin.y}
                    x2={x}
                    y2={y}
                    stroke={color}
                    strokeWidth={2}
                    markerEnd="url(#arrow)"
                />
                <circle
                    cx={x}
                    cy={y}
                    r={6}
                    fill={color}
                    className="cursor-pointer"
                    onMouseDown={onDrag}
                />
            </>
        );
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <svg width={width} height={height} className="border border-gray-300">
                {/* Grid */}
                {Array.from({ length: Math.floor(width / scale) }, (_, i) => {
                    const x = i * scale;
                    return <line key={`v-${i}`} x1={x} y1={0} x2={x} y2={height} stroke="#eee" />;
                })}
                {Array.from({ length: Math.floor(height / scale) }, (_, i) => {
                    const y = i * scale;
                    return <line key={`h-${i}`} x1={0} y1={y} x2={width} y2={y} stroke="#eee" />;
                })}

                {/* Axes */}
                <line x1={0} y1={origin.y} x2={width} y2={origin.y} stroke="#ccc" />
                <line x1={origin.x} y1={0} x2={origin.x} y2={height} stroke="#ccc" />

                {/* Vectors */}
                {drawVector(vecA, 'blue', handleDrag(setVecA))}
                {drawVector(vecB, 'green', handleDrag(setVecB))}

                <defs>
                    <marker
                        id="arrow"
                        markerWidth="10"
                        markerHeight="10"
                        refX="6"
                        refY="3"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path d="M0,0 L0,6 L9,3 z" fill="black" />
                    </marker>
                </defs>
            </svg>

            <div className="text-center">
                <p>🟦 Vector A: [{vecA.x}, {vecA.y}]</p>
                <p>🟩 Vector B: [{vecB.x}, {vecB.y}]</p>
                <p>📐 Angle: {angleDeg}°</p>
                <p>✴️ Dot Product: {dot}</p>
                <p>🧠 Relationship: <strong>{label}</strong></p>
            </div>
        </div>
    );
};

export default DotProductVisualizer;
