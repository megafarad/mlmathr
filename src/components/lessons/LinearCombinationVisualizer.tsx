import React from 'react';

interface Props {
    a: number;
    b: number;
    onChange: (a: number, b: number) => void;
}

const width = 400;
const height = 400;
const scale = 40;
const origin = { x: width / 2, y: height / 2 };

const drawVector = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    label: string
) => {
    const endX = origin.x + x * scale;
    const endY = origin.y - y * scale;

    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.font = '12px sans-serif';
    ctx.fillText(label, endX + 5, endY - 5);
};

const LinearCombinationVisualizer: React.FC<Props> = ({ a, b, onChange }) => {
    const v1 = [1, 0];
    const v2 = [0, 1];
    const result = [a * v1[0] + b * v2[0], a * v1[1] + b * v2[1]];

    const draw = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        // Grid
        ctx.strokeStyle = '#eee';
        for (let i = 0; i <= width; i += scale) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        for (let j = 0; j <= height; j += scale) {
            ctx.beginPath();
            ctx.moveTo(0, j);
            ctx.lineTo(width, j);
            ctx.stroke();
        }

        drawVector(ctx, v1[0], v1[1], 'blue', 'v₁');
        drawVector(ctx, v2[0], v2[1], 'green', 'v₂');
        drawVector(ctx, result[0], result[1], 'red', 'a·v₁ + b·v₂');
    };

    return (
        <div className="space-y-4">
            <canvas ref={draw} width={width} height={height} className="border" />

            <div className="flex flex-col gap-2">
                <label>
                    Scalar A: {a}
                    <input
                        type="range"
                        min={-5}
                        max={5}
                        step={1}
                        value={a}
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
                        onChange={(e) => onChange(a, Number(e.target.value))}
                        className="w-full"
                    />
                </label>
            </div>
        </div>
    );
};

export default LinearCombinationVisualizer;
