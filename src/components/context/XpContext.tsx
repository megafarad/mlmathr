import React, { createContext, useContext, useState } from 'react';
import { useProgressSync } from "../../hooks/useProgressSync.ts";
import {type ModuleItem, modules, allItems} from "../../modules.tsx";

type XpContextType = {
    xp: number;
    completedLessons: Set<string>;
    quizScores: Record<string, { score: number; answers: (number | null)[] }>
    setQuizScores: React.Dispatch<React.SetStateAction<Record<string, { score: number; answers: (number| null)[] }>>>;
    getQuizScore: (id: string) => number;
    addXpForLesson: (lessonId: string, amount: number) => void;
    hasCompleted: (lessonId: string) => boolean;
    isUnlocked: (lessonId: string) => boolean;
    getNeededPrerequisites: (lessonId: string) => ModuleItem[];
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
    const [quizScores, setQuizScores] = useState<Record<string, { score: number; answers: (number | null)[] }>>({});

    const addXpForLesson = (lessonId: string, amount: number) => {
        if (completedLessons.has(lessonId)) return;
        setXp((prev: number) => prev + amount);
        setCompletedLessons((prev) => new Set(prev).add(lessonId));
    };

    const hasCompleted = (lessonId: string) => completedLessons.has(lessonId);

    const isUnlocked = (lessonId: string) => {
        const item = modules.flatMap(m => m.items).find(item => item.id === lessonId);
        if (!item) return false;
        return item.prerequisites.every(id => completedLessons.has(id));
    };


    const getNeededPrerequisites = (lessonId: string) => {
        const item = allItems.find(item => item.id === lessonId);
        if (!item) return [];
        return item.prerequisites.filter(p => !completedLessons.has(p))
            .flatMap(p => allItems.filter(item => item.id === p))

    }


    const getQuizScore = (id: string) => quizScores[id]?.score ?? null;

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
            getNeededPrerequisites,
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
