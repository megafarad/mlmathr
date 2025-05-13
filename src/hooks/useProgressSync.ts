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
    quizScores: Record<string, number>;
    setXp: (v: number) => void;
    setCompletedLessons: (v: Set<string>) => void;
    setQuizScores: (v: Record<string, number>) => void;
}) {
    const { user } = useAuth();
    const [hasLoaded, setHasLoaded] = useState(false);
    const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);


    useEffect(() => {
        if (!user) return;

        const load = async () => {
            const { data, error } = await supabase
                .from('progress')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (data) {
                setXp(data.xp ?? 0);
                setCompletedLessons(new Set(data.completed_lessons ?? []));
                setQuizScores(data.quiz_scores ?? {});
                setHasLoaded(true);
            } else if (error?.code === 'PGRST116') {
                // No row exists, insert blank but DO NOT sync until next load cycle
                console.log('[SYNC] Inserting first-time user progress');
                await supabase.from('progress').insert({
                    user_id: user.id,
                    xp: 0,
                    completed_lessons: [],
                    quiz_scores: {},
                });
                // Do not set hasLoaded yet
            } else {
                console.error('[SYNC] Unexpected error loading:', error);
            }
        };

        load();
    }, [setCompletedLessons, setQuizScores, setXp, user]);

    useEffect(() => {
        if (!user || !hasLoaded) return;

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
    }, [user, hasLoaded, xp, completedLessons, quizScores]);

    return hasLoaded;
}
