import React, { useState, useEffect } from 'react';

interface GradientVisualizerProps {
    onGoalAchieved?: () => void;
}

const GradientVisualizer: React.FC<GradientVisualizerProps> = ({ onGoalAchieved }) => {
    const [point, setPoint] = useState({ x: 1, y: 1 });
    const [goalFired, setGoalFired] = useState(false);

    const width = 400;
    const height = 400;
    const scale = 30;
    const origin = { x: width / 2, y: height / 2 };

    const toCanvasCoords = (x: number, y: number) => ({
        x: origin.x + x * scale,
        y: origin.y - y * scale,
    });

    const toMathCoords = (x: number, y: number) => ({
        x: (x - origin.x) / scale,
        y: (origin.y - y) / scale,
    });

    const maxX = Math.floor(width / (2 * scale));
    const maxY = Math.floor(height / (2 * scale));

    const handleMouseDown = (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
        const svg = e.currentTarget.ownerSVGElement!;
        const bounds = svg.getBoundingClientRect();

        const onMouseMove = (moveEvent: MouseEvent) => {
            const canvasX = moveEvent.clientX - bounds.left;
            const canvasY = moveEvent.clientY - bounds.top;

            const math = toMathCoords(canvasX, canvasY);

            const clamped = {
                x: Math.max(-maxX, Math.min(maxX, Math.round(math.x))),
                y: Math.max(-maxY, Math.min(maxY, Math.round(math.y))),
            };

            setPoint(clamped);
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const gradient = { x: 2 * point.x, y: 2 * point.y };
    const pointCanvas = toCanvasCoords(point.x, point.y);
    const gradientEnd = toCanvasCoords(point.x + gradient.x * 0.2, point.y + gradient.y * 0.2);
    const magnitude = Math.hypot(gradient.x, gradient.y);

    useEffect(() => {
        const target = { x: 3, y: 4 };
        const isClose = Math.abs(point.x - target.x) < 0.3 && Math.abs(point.y - target.y) < 0.3;

        if (isClose && !goalFired) {
            setPoint(target); // Snap to (3, 4)
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [point, goalFired, onGoalAchieved]);

    return (
        <svg width={width} height={height} className="border border-gray-300 select-none">
            {/* Contour rings (level curves) */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((r) => (
                <circle
                    key={r}
                    cx={origin.x}
                    cy={origin.y}
                    r={r * scale}
                    fill="none"
                    stroke="#eee"
                />
            ))}

            {/* Axes */}
            <line x1={0} y1={origin.y} x2={width} y2={origin.y} stroke="#ccc" />
            <line x1={origin.x} y1={0} x2={origin.x} y2={height} stroke="#ccc" />

            {/* Gradient vector */}
            <line
                x1={pointCanvas.x}
                y1={pointCanvas.y}
                x2={gradientEnd.x}
                y2={gradientEnd.y}
                stroke="red"
                strokeWidth={2}
                markerEnd="url(#arrow)"
            />

            {/* Draggable point */}
            <circle
                cx={pointCanvas.x}
                cy={pointCanvas.y}
                r={6}
                fill="blue"
                onMouseDown={handleMouseDown}
                className="cursor-pointer"
            />

            {/* Arrowhead */}
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
                    <path d="M0,0 L0,6 L9,3 z" fill="red" />
                </marker>
            </defs>

            {/* Labels */}
            <text x={10} y={20} fill="#333">
                Point: ({point.x}, {point.y})
            </text>
            <text x={10} y={40} fill="#333">
                Gradient: (2×{point.x}, 2×{point.y}) = ({gradient.x}, {gradient.y})
            </text>
            <text x={10} y={60} fill="#333">
                Magnitude: {magnitude.toFixed(2)}
            </text>
        </svg>
    );
};

export default GradientVisualizer;
