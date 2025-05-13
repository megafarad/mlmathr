import React from 'react';
import { useXp } from "../context/XpContext.tsx";

const SettingsPage: React.FC = () => {
    const { resetProgress } =  useXp();

    const handleResetProgress = () => {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            resetProgress();
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">⚙️ Settings</h2>

            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium mb-1">Reset Progress</h3>
                    <button
                        onClick={handleResetProgress}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Reset All Progress
                    </button>
                </div>

                {/*<div>
                    <h3 className="text-lg font-medium mb-1">Theme</h3>
                    <button
                        onClick={() => {
                            const html = document.documentElement;
                            html.classList.toggle('dark');
                            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
                        }}
                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200"
                    >
                        Toggle Dark Mode
                    </button>
                </div>*/}
            </div>
        </div>
    );
};

export default SettingsPage;
