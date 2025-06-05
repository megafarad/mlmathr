import { useEffect, useRef, useState } from 'react';
import { useAuth } from "../components/context/AuthContext.tsx";
import { supabase } from "../supabase.ts";

export function useProgressSync({
                                    xp,
                                    completedLessons,
                                    quizScores,
                                    setXp,
                                    setCompletedLessons,
                                    setQuizScores,
                                }: {
    xp: number;
    completedLessons: Set<string>;
    quizScores: Record<string, { score: number; answers: (number | null)[] }>;
    setXp: (v: number) => void;
    setCompletedLessons: (v: Set<string>) => void;
    setQuizScores: (v: Record<string, { score: number; answers: number[] }>) => void;
}) {
    const { user } = useAuth();
    const [hasLoaded, setHasLoaded] = useState(false);
    const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    function isEmptyObject(obj: unknown): obj is Record<string, never> {
        return typeof obj === 'object' &&
            obj !== null &&
            !Array.isArray(obj) &&
            Object.keys(obj).length === 0;
    }

    const xpLocalStorageKey = 'xp';
    const completedLessonsLocalStorageKey = 'completedLessons';
    const quizScoresLocalStorageKey = 'quizScores';

    useEffect(() => {
        if (!user) {
            setHasLoaded(false);
            setXp(parseInt(localStorage.getItem(xpLocalStorageKey) ?? '0'));
            setCompletedLessons(new Set(JSON.parse(localStorage.getItem(completedLessonsLocalStorageKey) ?? '[]')));
            setQuizScores(JSON.parse(localStorage.getItem(quizScoresLocalStorageKey) ?? '{}'));
            setHasLoaded(true);
        } else {
            const localXP = parseInt(localStorage.getItem(xpLocalStorageKey) ?? '0');
            const localCompletedLessons: Set<string> = new Set(JSON.parse(localStorage.getItem(completedLessonsLocalStorageKey) ?? '[]'));
            const localQuizScores = JSON.parse(localStorage.getItem(quizScoresLocalStorageKey) ?? '{}');

            const load = async () => {
                const { data, error } = await supabase
                    .from('progress')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();

                if (data) {
                    const cloudXP = data.xp ?? 0;
                    const cloudCompletedLessons: Set<string> = new Set(data.completed_lessons ?? []);
                    const cloudQuizScores = data.quiz_scores ?? {};

                    const xpToSet = cloudXP > 0 ? cloudXP : localXP;
                    const completedLessonsToSet = cloudCompletedLessons.size > 0 ? cloudCompletedLessons : localCompletedLessons;
                    const quizScoresToSet = isEmptyObject(cloudQuizScores) ? localQuizScores : cloudQuizScores;

                    setXp(xpToSet);
                    setCompletedLessons(completedLessonsToSet);
                    setQuizScores(quizScoresToSet);
                    setHasLoaded(true);
                } else if (error?.code === 'PGRST116') {
                    // No row exists, insert blank but DO NOT sync until next load cycle
                    console.log('[SYNC] Inserting first-time user progress');
                    await supabase.from('progress').insert({
                        user_id: user.id,
                        xp: localXP,
                        completed_lessons: localCompletedLessons,
                        quiz_scores: localQuizScores,
                    });
                    // Do not set hasLoaded yet
                } else {
                    console.error('[SYNC] Unexpected error loading:', error);
                }
            };
            setHasLoaded(false);
            load();
        }
    }, [setCompletedLessons, setQuizScores, setXp, user]);

    useEffect(() => {
        if (!user) {
            if (!hasLoaded) return;
            localStorage.setItem(xpLocalStorageKey, JSON.stringify(xp));
            localStorage.setItem(completedLessonsLocalStorageKey, JSON.stringify(Array.from(completedLessons)));
            localStorage.setItem(quizScoresLocalStorageKey, JSON.stringify(quizScores));
        } else {
            if (!hasLoaded) return;
            if (saveTimeout.current) clearTimeout(saveTimeout.current);

            saveTimeout.current = setTimeout(() => {
                const upsert = async () => {
                    const payload = {
                        user_id: user.id,
                        xp,
                        completed_lessons: Array.from(completedLessons),
                        quiz_scores: quizScores,
                    };
                    await supabase.from('progress').upsert(payload).select();
                }
                upsert();
            }, 1000);
        }
    }, [user, hasLoaded, xp, completedLessons, quizScores]);

    return hasLoaded;
}
