import React from 'react';
import {type CanvasVector, GraphCanvas} from "@sirhc77/canvas-math-kit";

interface Props {
    a: number;
    b: number;
    onChange: (a: number, b: number) => void;
    goalFired: boolean;
}

const width = 400;
const height = 400;
const scale = 40;

const LinearCombinationVisualizer: React.FC<Props> = ({ a, b, onChange, goalFired }) => {
    const v1: CanvasVector = { x: 1, y: 0, color: 'blue', draggable: false, label: 'v₁'};
    const v2: CanvasVector = { x: 0, y: 1, color: 'green', draggable: false, label: 'v₂'};
    const result: CanvasVector = { x: a * v1.x + b * v2.x, y: a * v1.y + b * v2.y, color: 'red', draggable: false,
        label: 'a·v₁ + b·v₂'};

    return (
        <div className="space-y-4">
            <GraphCanvas
                width={width}
                height={height}
                scale={scale}
                vectors={[v1, v2, result]}
            />

            <div className="flex flex-col gap-2">
                <label>
                    Scalar A: {a}
                    <input
                        type="range"
                        min={-5}
                        max={5}
                        step={1}
                        value={a}
                        disabled={goalFired}
                        onChange={(e) => onChange(Number(e.target.value), b)}
                        className="w-full"
                    />
                </label>
                <label>
                    Scalar B: {b}
                    <input
                        type="range"
                        min={-5}
                        max={5}
                        step={1}
                        value={b}
                        disabled={goalFired}
                        onChange={(e) => onChange(a, Number(e.target.value))}
                        className="w-full"
                    />
                </label>
            </div>
        </div>
    );
};

export default LinearCombinationVisualizer;
