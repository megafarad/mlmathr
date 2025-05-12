import React, { useState } from 'react';

const width = 300;
const height = 300;
const origin = { x: width / 2, y: height / 2 };
const scale = 15
const maxX = Math.floor((width / 2) / scale);
const maxY = Math.floor((height / 2) / scale);


const VectorVisualizer: React.FC = () => {
    const [vector, setVector] = useState({ x: 3, y: 3 });
    const magnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2).toFixed(2);

    return (
        <div className="flex flex-col items-center space-y-4">
            <svg width={width} height={height} className="border border-gray-300">
                {/* Axes */}
                {/* Grid lines */}
                {Array.from({ length: Math.floor(width / scale) }, (_, i) => {
                    const x = i * scale;
                    return (
                        <line
                            key={`v-${i}`}
                            x1={x}
                            y1={0}
                            x2={x}
                            y2={height}
                            stroke="#eee"
                            strokeWidth={1}
                        />
                    );
                })}
                {Array.from({ length: Math.floor(height / scale) }, (_, i) => {
                    const y = i * scale;
                    return (
                        <line
                            key={`h-${i}`}
                            x1={0}
                            y1={y}
                            x2={width}
                            y2={y}
                            stroke="#eee"
                            strokeWidth={1}
                        />
                    );
                })}
                <line x1={0} y1={origin.y} x2={width} y2={origin.y} stroke="#ccc" />
                <line x1={origin.x} y1={0} x2={origin.x} y2={height} stroke="#ccc" />

                {/* Vector */}
                <line
                    x1={origin.x}
                    y1={origin.y}
                    x2={origin.x + vector.x * scale}
                    y2={origin.y - vector.y * scale}
                    stroke="blue"
                    strokeWidth={2}
                    markerEnd="url(#arrow)"
                />
                <circle
                    cx={origin.x + vector.x * scale}
                    cy={origin.y - vector.y * scale}
                    r={6}
                    fill="blue"
                    className="cursor-pointer"
                    onMouseDown={(e) => {
                        const onMouseMove = (moveEvent: MouseEvent) => {
                            const bounds = (e.target as SVGElement).ownerSVGElement!.getBoundingClientRect();
                            const newX = moveEvent.clientX - bounds.left - origin.x;
                            const newY = origin.y - (moveEvent.clientY - bounds.top);
                            const snapped = {
                                x: Math.max(-maxX, Math.min(maxX, Math.round(newX / scale))),
                                y: Math.max(-maxY, Math.min(maxY, Math.round(newY / scale))),
                            };
                            setVector(snapped);
                        };

                        const onMouseUp = () => {
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);
                        };

                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                    }}
                />

                {/* Arrow marker */}
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
                        <path d="M0,0 L0,6 L9,3 z" fill="blue" />
                    </marker>
                </defs>
            </svg>

            <div className="text-center">
                <p>📍 Vector: [{vector.x.toFixed(1)}, {vector.y.toFixed(1)}]</p>
                <p>📏 Magnitude: {magnitude}</p>
            </div>
        </div>
    );
};

export default VectorVisualizer;
