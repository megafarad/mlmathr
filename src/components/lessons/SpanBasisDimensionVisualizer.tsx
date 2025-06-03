import React, { useState } from 'react';
import {type CanvasVector, GraphCanvas, toCanvas} from "@sirhc77/canvas-math-kit";

type Point = { x: number; y: number };

const width = 400;
const height = 400;
const scale = 40;

const areCollinear = (v1: CanvasVector, v2: CanvasVector) =>
    v1.x * v2.y === v1.y * v2.x;

interface SpanBasisVisualizerProps {
    onGoalAchieved?: () => void;
}

const SpanBasisDimensionVisualizer: React.FC<SpanBasisVisualizerProps> = ({ onGoalAchieved }) => {
    const [v1, setV1] = useState<CanvasVector>({ x: 1, y: 1, color: 'blue', draggable: true, headStyle: 'both',
        label: (x,y) => `[${x.toFixed(1)}, ${y.toFixed(1)}]`});
    const [v2, setV2] = useState<CanvasVector>({ x: 2, y: 2, color: 'green', draggable: true, headStyle: 'both',
        label: (x,y) => `[${x.toFixed(1)}, ${y.toFixed(1)}]`
    });
    const [goalFired, setGoalFired] = useState(false);


    const customDraw = (ctx: CanvasRenderingContext2D, origin: Point, scale: number) => {
        if (areCollinear(v1, v2)) {
            ctx.beginPath();
            ctx.moveTo(origin.x - v1.x * scale * 10, origin.y + v1.y * scale * 10);
            ctx.lineTo(origin.x + v1.x * scale * 10, origin.y - v1.y * scale * 10);
            ctx.strokeStyle = 'rgba(255,0,0,0.2)';
            ctx.lineWidth = 4;
            ctx.stroke();
        } else {
            const a = toCanvas(v1.x, v1.y, origin, scale);
            const b = toCanvas(v2.x, v2.y, origin, scale);
            const c = toCanvas(v1.x + v2.x, v1.y + v2.y, origin, scale);

            ctx.fillStyle = 'rgba(255,0,0,0.2)';
            ctx.beginPath();
            ctx.moveTo(origin.x, origin.y);
            ctx.lineTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.lineTo(b.x, b.y);
            ctx.closePath();
            ctx.fill();
        }
    }

    return (
        <div>
            <GraphCanvas width={width}
                         height={height}
                         scale={scale}
                         vectors={[v1, v2]}
                         snap={1}
                         onVectorsChange={([v1, v2]) => {
                             setV1(v1);
                             setV2(v2);
                             const dependent = areCollinear(v1, v2);
                             if (!dependent && !goalFired) {
                                 setGoalFired(true);
                                 onGoalAchieved?.();
                             }
                         }}
                         customDraw={customDraw}
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
