import React, {useEffect, useState} from 'react';
import {type CanvasVector, GraphCanvas} from "@sirhc77/canvas-math-kit";

const width = 400;
const height = 400;
const scale = 25;

interface Props {
    onGoalAchieved?: () => void;
    matrix: number[][];
}

const NullColumnSpaceVisualizer: React.FC<Props> = ({ onGoalAchieved, matrix }) => {
    const [vector, setVector] = useState<CanvasVector>({ x: 1, y: 1, color: 'blue', draggable: true, headStyle: 'both'});
    const [goalFired, setGoalFired] = useState(false);

    const applyMatrix = ({x, y}: CanvasVector, mat: number[][]): CanvasVector => ( {
        x: mat[0][0] * x + mat[0][1] * y,
        y: mat[1][0] * x + mat[1][1] * y,
        color: 'red',
        draggable: false,
        headStyle: 'arrow',
    });

    const transformed = applyMatrix(vector, matrix);
    const isZero = Math.abs(transformed.x) < 0.01 && Math.abs(transformed.y) < 0.01;

    const zeroVector = vector.x === 0 && vector.y === 0;

    useEffect(() => {
        if (!goalFired && isZero && !zeroVector) {
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [isZero, goalFired, onGoalAchieved, zeroVector]);
    return (
        <div className="space-y-4">
            <GraphCanvas width={width}
                         height={height}
                         scale={scale}
                         snap={1}
                         vectors={[vector, transformed]}
                         locked={goalFired}
                         onVectorsChange={vectors => {
                             setVector(vectors[0]);
                         }}
            />
            <div className="text-sm text-center space-y-1">
                <div>🟦 Original vector: ({vector.x}, {vector.y})</div>
                <div>🟥 Transformed: ({transformed.x.toFixed(2)}, {transformed.y.toFixed(2)})</div>
            </div>
        </div>
    );
};

export default NullColumnSpaceVisualizer;
