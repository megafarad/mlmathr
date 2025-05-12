import React, { createContext, useContext, useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'mlmathrProgress';

type XpContextType = {
    xp: number;
    completedLessons: Set<string>;
    addXpForLesson: (lessonId: string, amount: number) => void;
    hasCompleted: (lessonId: string) => boolean;
    isUnlocked: (lessonId: string) => boolean;
    resetProgress: () => void;
    revision: number;
};

const XpContext = createContext<XpContextType | undefined>(undefined);

export const XpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getInitialState = () => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return {
                    xp: parsed.xp || 0,
                    completedLessons: new Set<string>(parsed.completedLessons || []),
                };
            } catch {
                return { xp: 0, completedLessons: new Set<string>() };
            }
        }
        return { xp: 0, completedLessons: new Set<string>() };
    };

    const initialState = getInitialState();

    const [xp, setXp] = useState(initialState.xp);
    const [revision, setRevision] = useState(0);
    const [completedLessons, setCompletedLessons] = useState(initialState.completedLessons);

    // Load from localStorage on first render
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            const { xp, completedLessons } = JSON.parse(saved);
            setXp(xp || 0);
            setCompletedLessons(new Set(completedLessons || []));
        }
    }, []);

    // Save to localStorage anytime state changes
    useEffect(() => {
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({
                xp,
                completedLessons: Array.from(completedLessons),
            })
        );
    }, [xp, completedLessons]);

    const addXpForLesson = (lessonId: string, amount: number) => {
        if (completedLessons.has(lessonId)) return;
        setXp((prev: number) => prev + amount);
        setCompletedLessons((prev) => new Set(prev).add(lessonId));
    };

    const hasCompleted = (lessonId: string) => completedLessons.has(lessonId);

    const isUnlocked = (lessonId: string) => {
        const dependencies: Record<string, string[]> = {
            'vectors-quiz' : ['vectors'],
            'dot-product': ['vectors-quiz'],
            'dot-product-quiz': ['dot-product'],
            'gradient': ['dot-product-quiz'],
            'gradient-quiz': ['gradient'],
            'matrix': ['gradient-quiz'],
            'matrix-quiz': ['matrix'],
        };
        const required = dependencies[lessonId] || [];
        return required.every((dep) => completedLessons.has(dep));
    };

    const resetProgress = () => {
        setXp(0);
        setCompletedLessons(new Set<string>());
        localStorage.removeItem(LOCAL_STORAGE_KEY);

        Object.keys(localStorage)
            .filter((key) => key.startsWith('quiz:'))
            .forEach((key) => localStorage.removeItem(key));

        setRevision((r) => r + 1); // 👈 trigger subscribers to re-evaluate
    };


    return (
        <XpContext.Provider value={{
            xp,
            completedLessons,
            addXpForLesson,
            hasCompleted,
            isUnlocked,
            resetProgress,
            revision,
        }}>
            {children}
        </XpContext.Provider>
    );
};

export const useXp = () => {
    const context = useContext(XpContext);
    if (!context) throw new Error('useXp must be used within XpProvider');
    return context;
};
