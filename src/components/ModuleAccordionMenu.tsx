import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { modules } from '../modules.tsx';

interface Props {
    lockedIds: Set<string>;
}

const ModuleAccordionMenu: React.FC<Props> = ({ lockedIds }) => {
    const [modulesOpen, setModulesOpen] = useState(false);
    const [openModules, setOpenModules] = useState<Set<string>>(new Set());
    const [openSections, setOpenSections] = useState<Record<string, Set<'Lessons' | 'Quizzes'>>>({});

    const toggleModule = (title: string) => {
        const next = new Set(openModules);
        if (next.has(title)) {
            next.delete(title);
        } else {
            next.add(title);
        }
        setOpenModules(next);
    };

    const toggleSection = (moduleTitle: string, section: 'Lessons' | 'Quizzes') => {
        const currentSections = openSections[moduleTitle] || new Set();
        const next = new Set(currentSections);
        if (next.has(section)) {
            next.delete(section);
        } else {
            next.add(section);
        }
        setOpenSections({
            ...openSections,
            [moduleTitle]: next,
        });
    };

    return (
        <div className="relative inline-block">
            <button
                className="w-full text-left px-4 py-2 bg-white hover:bg-gray-100 rounded flex justify-between items-center font-semibold"
                onClick={() => setModulesOpen(!modulesOpen)}
            >
                <span>📚 Modules</span>
                <span>{modulesOpen ? '▲' : '▼'}</span>
            </button>

            {modulesOpen && (
                <div
                    className="absolute z-50 mt-1 w-72 bg-white border border-gray-200 shadow-lg rounded max-h-[80vh] overflow-auto"
                >
                    {modules.map((mod) => {
                        const isOpen = openModules.has(mod.title);
                        const sections = openSections[mod.title] || new Set();

                        return (
                            <div key={mod.title} className="border rounded">
                                <button
                                    className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
                                    onClick={() => toggleModule(mod.title)}
                                >
                                    <span>{mod.title}</span>
                                    <span>{isOpen ? '▲' : '▼'}</span>
                                </button>

                                {isOpen && (
                                    <div className="px-4 py-2 space-y-2">
                                        {/* Lessons */}
                                        <div>
                                            <button
                                                className="w-full text-left text-sm font-semibold flex justify-between items-center"
                                                onClick={() => toggleSection(mod.title, 'Lessons')}
                                            >
                                                <span>📘 Lessons</span>
                                                <span>{sections.has('Lessons') ? '▲' : '▼'}</span>
                                            </button>
                                            {sections.has('Lessons') && (
                                                <div className="pl-4 pt-1 space-y-1">
                                                    {mod.items
                                                        .filter((item) => item.type === 'lesson')
                                                        .map((item) =>
                                                            lockedIds.has(item.id) ? (
                                                                <div key={item.id} className="text-gray-400 text-sm">
                                                                    🔒 {item.listing}
                                                                </div>
                                                            ) : (
                                                                <Link
                                                                    key={item.id}
                                                                    to={item.path}
                                                                    className="block text-sm text-blue-600 hover:underline"
                                                                >
                                                                    {item.listing}
                                                                </Link>
                                                            )
                                                        )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Quizzes */}
                                        <div>
                                            <button
                                                className="w-full text-left text-sm font-semibold flex justify-between items-center"
                                                onClick={() => toggleSection(mod.title, 'Quizzes')}
                                            >
                                                <span>🧪 Quizzes</span>
                                                <span>{sections.has('Quizzes') ? '▲' : '▼'}</span>
                                            </button>
                                            {sections.has('Quizzes') && (
                                                <div className="pl-4 pt-1 space-y-1">
                                                    {mod.items
                                                        .filter((item) => item.type === 'quiz')
                                                        .map((item) =>
                                                            lockedIds.has(item.id) ? (
                                                                <div key={item.id} className="text-gray-400 text-sm">
                                                                    🔒 {item.listing}
                                                                </div>
                                                            ) : (
                                                                <Link
                                                                    key={item.id}
                                                                    to={item.path}
                                                                    className="block text-sm text-blue-600 hover:underline"
                                                                >
                                                                    {item.listing}
                                                                </Link>
                                                            )
                                                        )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );

};

export default ModuleAccordionMenu;
