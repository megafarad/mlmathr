import React, { useState } from 'react';

const MatrixVisualizer: React.FC = () => {
    const [matrix, setMatrix] = useState([
        [2, 0],
        [0, 1],
    ]);
    const [vector, setVector] = useState({ x: 1, y: 1 });

    const width = 500;
    const height = 500;
    const scale = 50;
    const origin = { x: width / 2, y: height / 2 };

    const toCanvas = (x: number, y: number) => ({
        x: origin.x + x * scale,
        y: origin.y - y * scale,
    });

    const transformed = {
        x: matrix[0][0] * vector.x + matrix[0][1] * vector.y,
        y: matrix[1][0] * vector.x + matrix[1][1] * vector.y,
    };

    const vectorCanvas = toCanvas(vector.x, vector.y);
    const transformedCanvas = toCanvas(transformed.x, transformed.y);

    const handleDrag = (e: React.MouseEvent<SVGCircleElement>) => {
        const svg = e.currentTarget.ownerSVGElement!;
        const bounds = svg.getBoundingClientRect();

        const onMove = (move: MouseEvent) => {
            const x = move.clientX - bounds.left;
            const y = move.clientY - bounds.top;
            const mathX = Math.round((x - origin.x) / scale);
            const mathY = Math.round((origin.y - y) / scale);
            setVector({ x: mathX, y: mathY });
        };

        const onUp = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    };

    return (
        <div className="space-y-4">
            <svg width={width} height={height} className="border border-gray-300">
                {/* Grid lines */}
                {Array.from({ length: width / scale }, (_, i) => {
                    const x = i * scale;
                    return (
                        <line
                            key={`v-${i}`}
                            x1={x}
                            y1={0}
                            x2={x}
                            y2={height}
                            stroke="#eee"
                            strokeDasharray="2,2"
                        />
                    );
                })}

                {Array.from({ length: height / scale }, (_, i) => {
                    const y = i * scale;
                    return (
                        <line
                            key={`h-${i}`}
                            x1={0}
                            y1={y}
                            x2={width}
                            y2={y}
                            stroke="#eee"
                            strokeDasharray="2,2"
                        />
                    );
                })}

                {/* Axes */}
                <line x1={0} y1={origin.y} x2={width} y2={origin.y} stroke="#ccc" />
                <line x1={origin.x} y1={0} x2={origin.x} y2={height} stroke="#ccc" />

                <defs>
                    <marker
                        id="arrow-blue"
                        markerWidth="10"
                        markerHeight="10"
                        refX="6"
                        refY="3"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path d="M0,0 L0,6 L9,3 z" fill="blue" />
                    </marker>
                    <marker
                        id="arrow-green"
                        markerWidth="10"
                        markerHeight="10"
                        refX="6"
                        refY="3"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path d="M0,0 L0,6 L9,3 z" fill="green" />
                    </marker>
                </defs>


                {/* Original vector (blue) */}
                <line
                    x1={origin.x}
                    y1={origin.y}
                    x2={vectorCanvas.x}
                    y2={vectorCanvas.y}
                    stroke="blue"
                    strokeWidth={2}
                    markerEnd="url(#arrow-blue)"
                />

                {/* Transformed vector (green) */}
                <line
                    x1={origin.x}
                    y1={origin.y}
                    x2={transformedCanvas.x}
                    y2={transformedCanvas.y}
                    stroke="green"
                    strokeWidth={2}
                    markerEnd="url(#arrow-green)"
                />

                {/* Draggable point */}
                <circle
                    cx={vectorCanvas.x}
                    cy={vectorCanvas.y}
                    r={6}
                    fill="blue"
                    onMouseDown={handleDrag}
                    className="cursor-pointer"
                />
            </svg>

            <div className="text-sm text-gray-700">
                Vector: ({vector.x}, {vector.y})
            </div>
            <div className="text-sm text-gray-700">
                Transformed: ({transformed.x.toFixed(2)}, {transformed.y.toFixed(2)})
            </div>

            {/* Matrix Controls */}
            <div className="grid grid-cols-2 gap-2 w-40">
                {matrix.map((row, i) =>
                    row.map((_val, j) => (
                        <input
                            key={`${i}-${j}`}
                            type="number"
                            value={matrix[i][j]}
                            onChange={(e) => {
                                const newMatrix = [...matrix];
                                newMatrix[i][j] = parseFloat(e.target.value);
                                setMatrix(newMatrix);
                            }}
                            className="border px-2 py-1 rounded w-full"
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MatrixVisualizer;
