import React, { useState } from 'react';
import {type CanvasVector, GraphCanvas, type Point, toCanvas} from "@sirhc77/canvas-math-kit";

const width = 400;
const height = 400;
const scale = 40;

const dot = (vectorA: CanvasVector, vectorB: CanvasVector) =>
    vectorA.x * vectorB.x + vectorA.y * vectorB.y;
const scaleVec = (vector: CanvasVector, s: number) => {
    const scaledVector: CanvasVector = {x: vector.x * s, y: vector.y * s, color: 'red', draggable: false, headStyle: 'none' };
    return scaledVector;
}
const proj = (vectorA: CanvasVector, vectorB: CanvasVector) => {
    const factor = dot(vectorA, vectorB) / dot(vectorA, vectorA);
    return scaleVec(vectorA, factor);
};

const formatVec = (v: CanvasVector) => `[${v.x.toFixed(1)}, ${v.y.toFixed(1)}]`;

interface ProjectionVisualizerProps {
    onGoalAchieved?: () => void;
}

const ProjectionVisualizer: React.FC<ProjectionVisualizerProps> = ({ onGoalAchieved }) => {
    const [vectorA, setVectorA] = useState<CanvasVector>({ x: 2, y: 1, color: 'blue', draggable: true, headStyle: 'both'});
    const [vectorB, setVectorB] = useState<CanvasVector>({ x: 1, y: 2, color: 'green', draggable: true, headStyle: 'both'});
    const [goalFired, setGoalFired] = useState(false);

    const projVec = proj(vectorA, vectorB);

    const dotAB = dot(vectorA, vectorB);
    const dotAA = dot(vectorA, vectorA);
    const factor = dotAA === 0 ? 0 : dotAB / dotAA;

    const isClose = (v1: CanvasVector, v2: CanvasVector, tolerance = 0.3) => {
        return Math.abs(v1.x - v2.x) < tolerance && Math.abs(v1.y - v2.y) < tolerance;
    };

    const maxX = Math.floor(width / (2 * scale));
    const maxY = Math.floor(height / (2 * scale));


    const handleVectorChange = (updated: CanvasVector[]) => {
        const [oldVecA, oldVecB] = updated;

        const xA = Math.max(-maxX, Math.min(maxX, Math.round(oldVecA.x)));
        const yA = Math.max(-maxY, Math.min(maxY, Math.round(oldVecA.y)));
        const xB = Math.max(-maxX, Math.min(maxX, Math.round(oldVecB.x)));
        const yB = Math.max(-maxY, Math.min(maxY, Math.round(oldVecB.y)));

        const newVecA = {...oldVecA, x: xA, y: yA}
        const newVecB = {...oldVecB, x: xB, y: yB}

        setVectorA(newVecA);
        setVectorB(newVecB);

        const target: CanvasVector = {x: 2, y: 0};
        if (!goalFired && isClose(projVec, target)) {
            const newVectorB: CanvasVector =  {x: vectorB.x * dotAA / dotAB, y: vectorB.y * dotAA / dotAB,
                color: 'green', draggable: true, headStyle: 'both'};
            setVectorB(newVectorB);
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }

    const customDraw = (ctx: CanvasRenderingContext2D, origin: Point, scale: number) => {
        const bCanvas = toCanvas(vectorB.x, vectorB.y, origin, scale);
        const pCanvas = toCanvas(projVec.x, projVec.y, origin, scale);
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(bCanvas.x, bCanvas.y);
        ctx.lineTo(pCanvas.x, pCanvas.y);
        ctx.strokeStyle = 'gray';
        ctx.stroke();
        ctx.setLineDash([]);
    }


    return (
        <div className="space-y-2">
            <GraphCanvas width={width}
                         height={height}
                         scale={scale}
                         vectors={[vectorA, vectorB, projVec]}
                         locked={goalFired}
                         onVectorsChange={handleVectorChange}
                         customDraw={customDraw}
            />
            <div className="text-center text-sm text-gray-600">
                🔴 Projection of <strong>b</strong> onto <strong>a</strong> shown in red.
            </div>
            <div className="text-center text-xs text-gray-500 mt-1">
                a · b = {dotAB.toFixed(2)}, a · a = {dotAA.toFixed(2)} ⇒ scale = {factor.toFixed(2)}
            </div>
            <div className="text-center text-xs text-gray-500">
                projₐ(b) = {factor.toFixed(2)} × {formatVec(vectorA)} = <strong>{formatVec(projVec)}</strong>
            </div>
        </div>
    );
};

export default ProjectionVisualizer;
