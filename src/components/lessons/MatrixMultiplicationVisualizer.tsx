import React, { useState } from 'react';

interface Props {
    onGoalAchieved?: () => void;
}

const defaultA = [
    [1, 2, 3],
    [4, 5, 6],
];

const defaultB = [
    [7, 8],
    [9, 10],
    [11, 12],
];

const dotProduct = (row: number[], col: number[]) =>
    row.reduce((sum, val, i) => sum + val * col[i], 0);

const MatrixMultiplicationVisualizer: React.FC<Props> = ({ onGoalAchieved }) => {
    const [matrixA, setMatrixA] = useState(defaultA);
    const [matrixB, setMatrixB] = useState(defaultB);
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

    const getColumn = (matrix: number[][], colIndex: number): number[] =>
        matrix.map(row => row[colIndex]);

    const result = matrixA.map((row) =>
        matrixB[0].map((_, c) => dotProduct(row, getColumn(matrixB, c)))
    );

    const renderMatrix = (
        matrix: number[][],
        onChange: (r: number, c: number, value: number) => void,
        highlight: { row?: number; col?: number } = {}
    ) => (
        <div className="inline-block">
            {matrix.map((row, r) => (
                <div key={r} className="flex">
                    {row.map((val, c) => (
                        <input
                            key={`${r}-${c}`}
                            type="number"
                            value={val}
                            onChange={e => onChange(r, c, parseFloat(e.target.value))}
                            className={`w-12 h-12 text-center border m-0.5 rounded ${
                                (highlight.row === r || highlight.col === c) ? 'bg-yellow-100' : ''
                            }`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );

    const selectedRow = selectedCell ? matrixA[selectedCell[0]] : null;
    const selectedCol = selectedCell ? getColumn(matrixB, selectedCell[1]) : null;
    const selectedResult = selectedRow && selectedCol
        ? dotProduct(selectedRow, selectedCol)
        : null;

    return (
        <div className="space-y-4 text-sm">
            <div className="flex justify-center items-center space-x-4">
                {/* Matrix A */}
                {renderMatrix(matrixA, (r, c, val) => {
                    const newMatrix = matrixA.map(row => [...row]);
                    newMatrix[r][c] = val;
                    setMatrixA(newMatrix);
                }, selectedCell ? { row: selectedCell[0] } : {})}

                <span className="text-xl">×</span>

                {/* Matrix B */}
                {renderMatrix(matrixB, (r, c, val) => {
                    const newMatrix = matrixB.map(row => [...row]);
                    newMatrix[r][c] = val;
                    setMatrixB(newMatrix);
                }, selectedCell ? { col: selectedCell[1] } : {})}

                <span className="text-xl">=</span>

                {/* Result Matrix */}
                <div className="inline-block">
                    {result.map((row, r) => (
                        <div key={r} className="flex">
                            {row.map((val, c) => (
                                <button
                                    key={`${r}-${c}`}
                                    onClick={() => {
                                        setSelectedCell([r, c]);
                                        const selectedRow = matrixA[r];
                                        const selectedCol = getColumn(matrixB, c);
                                        const result = dotProduct(selectedRow, selectedCol);
                                        if (result === 28) onGoalAchieved?.();
                                    }}
                                    className="w-12 h-12 border m-0.5 rounded bg-gray-100 hover:bg-gray-200"
                                >
                                    {val}
                                </button>

                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Dot product explanation */}
            {selectedCell && selectedRow && selectedCol && (
                <div className="text-center mt-2 text-gray-700">
                    <strong>Explanation for cell ({selectedCell[0] + 1}, {selectedCell[1] + 1}):</strong>
                    <br />
                    {selectedRow.map((val, i) => `${val}×${selectedCol[i]}`).join(' + ')} = {selectedResult}
                </div>
            )}
        </div>
    );
};

export default MatrixMultiplicationVisualizer;
