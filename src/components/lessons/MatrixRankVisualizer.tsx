import React, { useEffect, useState } from 'react';
import {type CanvasVector, GraphCanvas} from "@sirhc77/canvas-math-kit";

interface MatrixRankVisualizerProps {
    onGoalAchieved?: () => void;
}

const width = 400;
const height = 400;
const scale = 40;
const computeRank = (m: number[][]) => {
    const [a, b] = m[0];
    const [c, d] = m[1];
    const col1 = [a, c];
    const col2 = [b, d];
    const isZero = ([x, y]: number[]) => x === 0 && y === 0;
    const det = a * d - b * c;
    if (isZero(col1) && isZero(col2)) return 0;
    if (Math.abs(det) < 1e-8) return 1;
    return 2;
};

const MatrixRankVisualizer: React.FC<MatrixRankVisualizerProps> = ({ onGoalAchieved }) => {
    const [matrix, setMatrix] = useState([
        [1, 0],
        [0, 1],
    ]);
    const [rank, setRank] = useState(2);
    const [goalFired, setGoalFired] = useState(false);

    /** fire gate when rank == 1 */
    useEffect(() => {
        if (!goalFired && rank === 1) {
            setGoalFired(true);
            onGoalAchieved?.();
        }
    }, [rank, goalFired, onGoalAchieved]);

    // … existing canvas–drawing effect …
    useEffect(() => {
        setRank(computeRank(matrix));
    }, [matrix]);

    const vector0: CanvasVector = { x: matrix[0][0], y: matrix[1][0], color: 'blue', headStyle: 'arrow'};
    const vector1: CanvasVector = { x: matrix[0][1], y: matrix[1][1], color: 'green', headStyle: 'arrow' };

    return (
        <div className="space-y-4">
            <GraphCanvas width={width}
                         height={height}
                         scale={scale}
                         vectors={[vector0, vector1]}
            />
            <div className="text-center text-md font-semibold">Rank: {rank}</div>

            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto text-sm">
                <div>
                    <h3 className="font-semibold mb-1">Matrix</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {matrix.map((row, r) =>
                            row.map((val, c) => (
                                <input
                                    key={`${r}-${c}`}
                                    type="number"
                                    value={val}
                                    onChange={(e) => {
                                        const v = parseFloat(e.target.value) || 0;
                                        const m = matrix.map((row) => [...row]);
                                        m[r][c] = v;
                                        setMatrix(m);
                                    }}
                                    className="border px-2 py-1 w-16 text-center rounded"
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatrixRankVisualizer;
