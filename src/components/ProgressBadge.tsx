import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

interface ProgressBadgeProps {
    xp: number;
    userName?: string;
}

const ProgressBadge: React.FC<ProgressBadgeProps> = ({ xp, userName = 'Anonymous Learner' }) => {
    const badgeRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!badgeRef.current) return;
        const dataUrl = await toPng(badgeRef.current, { cacheBust: true });
        const link = document.createElement('a');
        link.download = 'mlmathr-progress-badge.png';
        link.href = dataUrl;
        link.click();
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div
                ref={badgeRef}
                style={{
                    width: 400,
                    height: 400,
                    backgroundColor: '#ffffff',
                    color: '#1a202c',
                    fontFamily: 'Arial, sans-serif',
                    border: '4px solid #facc15',
                    borderRadius: 12,
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 12,
                }}
            >
                <div style={{ fontSize: 28, fontWeight: 'bold', color: '#2563eb' }}>📘 MLMathr</div>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>ML Math Progress Badge</div>
                <div style={{ fontSize: 14 }}>Awarded to</div>
                <div style={{ fontSize: 20, fontWeight: 'bold' }}>{userName}</div>
                <div style={{ fontSize: 16 }}>🏆 XP Earned: {xp}</div>
                <div style={{ fontSize: 16, color: '#16a34a', fontWeight: 'bold' }}>✅ Foundations Complete</div>
                <div style={{ fontSize: 10, marginTop: 20 }}>mlmathr.com</div>
            </div>

            <button
                onClick={handleDownload}
                style={{
                    marginTop: 12,
                    backgroundColor: '#facc15',
                    color: '#1a202c',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
            >
                Download Badge
            </button>
        </div>
    );
};

export default ProgressBadge;
