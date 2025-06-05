import React, { useState, useEffect } from 'react';
import {
    drawArrowhead,
    drawCircle,
    drawLine,
    GraphCanvas,
    toCanvas,
    writeLabel,
    type Point,
    type DragTarget
} from "@sirhc77/canvas-math-kit";

interface GradientVisualizerProps {
    onGoalAchieved?: () => void;
}

const GradientVisualizer: React.FC<GradientVisualizerProps> = ({ onGoalAchieved }) => {
    const [point, setPoint] = useState<DragTarget>({ x: 2, y: 2, draggable: true });
    const [goalFired, setGoalFired] = useState(false);

    const width = 400;
    const height = 400;
    const scale = 25;
    const gradient = { x: 2 * point.x, y: 2 * point.y };
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

    const customDraw = (ctx: CanvasRenderingContext2D, origin: Point, scale: number) => {
        const pointCanvas = toCanvas(point.x, point.y, origin, scale);
        const gradientEnd = toCanvas(point.x + gradient.x * 0.2, point.y + gradient.y * 0.2, origin, scale);

        drawLine(ctx, pointCanvas, gradientEnd, 'red', 2);
        drawCircle(ctx, pointCanvas, 4, 'red');
        drawArrowhead(ctx, pointCanvas, gradientEnd, 'red');

        writeLabel(ctx, `Point: (${point.x}, ${point.y})`, 10, 20, '14px Ariel');
        writeLabel(ctx, `Gradient: (2×${point.x}, 2×${point.y}) = (${gradient.x}, ${gradient.y})`, 10, 40, '14px Ariel');
        writeLabel(ctx, `Magnitude: ${magnitude.toFixed(2)}`, 10, 60, '14px Ariel');
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((r) => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(origin.x, origin.y, r * scale, 0, 2 * Math.PI);
            ctx.strokeStyle = '#eee';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        })
    }

    return (
        <GraphCanvas width={width}
                     height={height}
                     scale={scale}
                     snap={0.5}
                     locked={goalFired}
                     customDraw={customDraw}
                     customDragTargets={[point]}
                     onCustomDragTargetsChange={(targets) => {setPoint(targets[0])}}/>
    );
};

export default GradientVisualizer;
