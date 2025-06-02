import React, { useState } from 'react';
import {type CanvasVector, GraphCanvas} from "@sirhc77/canvas-math-kit";

const width = 300;
const height = 300;
const scale = 15;

interface DotProductVisualizerProps {
    onGoalAchieved?: () => void;
}

const DotProductVisualizer: React.FC<DotProductVisualizerProps> = ({ onGoalAchieved }) => {
    const [vecA, setVecA] = useState<CanvasVector>({ x: 2, y: 3, color: 'blue', draggable: true, headStyle: 'both' });
    const [vecB, setVecB] = useState<CanvasVector>({ x: -1, y: 2, color: 'green', draggable: true, headStyle: 'both' });

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

    const handleVectorChange = (updated: CanvasVector[]) => {
        const [oldVecA, oldVecB] = updated;
        
        const xA = Math.max(-maxX, Math.min(maxX, Math.round(oldVecA.x)));
        const yA = Math.max(-maxY, Math.min(maxY, Math.round(oldVecA.y)));
        const xB = Math.max(-maxX, Math.min(maxX, Math.round(oldVecB.x)));
        const yB = Math.max(-maxY, Math.min(maxY, Math.round(oldVecB.y)));
        
        const newVecA = {...oldVecA, x: xA, y: yA}
        const newVecB = {...oldVecB, x: xB, y: yB}
        
        setVecA(newVecA);
        setVecB(newVecB);

        if (label === 'Perpendicular') {
            onGoalAchieved?.();
        }

    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <GraphCanvas width={width}
                         height={height}
                         scale={scale}
                         vectors={[vecA, vecB]}
                         onVectorsChange={handleVectorChange}/>
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
