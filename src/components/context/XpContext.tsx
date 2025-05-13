import React, { createContext, useContext, useState } from 'react';
import { useProgressSync } from "../../hooks/useProgressSync.ts";

type XpContextType = {
    xp: number;
    completedLessons: Set<string>;
    quizScores: Record<string, number>;
    setQuizScores: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    getQuizScore: (id: string) => number;
    addXpForLesson: (lessonId: string, amount: number) => void;
    hasCompleted: (lessonId: string) => boolean;
    isUnlocked: (lessonId: string) => boolean;
    resetProgress: () => void;
    revision: number;
    setRevision: React.Dispatch<React.SetStateAction<number>>;
    hasLoaded: boolean;
};

const XpContext = createContext<XpContextType | undefined>(undefined);

export const XpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [xp, setXp] = useState(0);
    const [revision, setRevision] = useState<number>(0);
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
    const [quizScores, setQuizScores] = useState<Record<string, number>>({});

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
            'linear-combinations' : ['matrix-quiz'],
        };
        const required = dependencies[lessonId] || [];
        return required.every((dep) => completedLessons.has(dep));
    };


    const getQuizScore = (id: string) => quizScores[id] ?? null;

    const resetProgress = () => {
        if (!hasLoaded) {
            console.warn('[RESET] Skipped reset — cloud data not loaded yet');
            return;
        }
        setXp(0);
        setCompletedLessons(new Set<string>());
        setQuizScores({});
        setRevision((r) => r + 1); // 👈 trigger subscribers to re-evaluate
    };
    const hasLoaded = useProgressSync({
        xp,
        completedLessons,
        quizScores,
        setXp,
        setCompletedLessons,
        setQuizScores,
    });


    return (
        <XpContext.Provider value={{
            xp,
            completedLessons,
            quizScores,
            setQuizScores,
            addXpForLesson,
            hasCompleted,
            isUnlocked,
            getQuizScore,
            resetProgress,
            revision,
            setRevision,
            hasLoaded,
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
