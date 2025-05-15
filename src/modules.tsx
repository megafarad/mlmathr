import type {FC} from "react";
import VectorLesson from "./components/lessons/VectorLesson.tsx";
import VectorQuiz from "./components/quizzes/VectorQuiz.tsx";
import DotProductLesson from "./components/lessons/DotProductLesson.tsx";
import DotProductQuiz from "./components/quizzes/DotProductQuiz.tsx";
import GradientLesson from "./components/lessons/GradientLesson.tsx";
import GradientQuiz from "./components/quizzes/GradientQuiz.tsx";
import LinearCombinationLesson from "./components/lessons/LinearCombinationLesson.tsx";
import LinearCombinationQuiz from "./components/quizzes/LinearCombinationQuiz.tsx";
import SpanBasisLesson from "./components/lessons/SpanBasisLesson.tsx";
import SpanBasisQuiz from "./components/quizzes/SpanBasisQuiz.tsx";
import ProjectionLesson from "./components/lessons/ProjectionLesson.tsx";
import ProjectionQuiz from "./components/quizzes/ProjectionQuiz.tsx";

type QuizMeta = {
    total: number;
}

type LessonItem = {
    id: string;
    type: 'lesson';
    title: string;
    listing: string;
    prerequisites: string[];
    path: string;
    component: FC
    meta?: null;
    xp: number;
}

type QuizItem = {
    id: string;
    type: 'quiz';
    title: string;
    listing: string;
    prerequisites: string[];
    path: string;
    component: FC
    meta: QuizMeta
    xp: number;

}

type ModuleItem = LessonItem | QuizItem;

type Module = {
    title: string;
    items: ModuleItem[];
}

export const modules: Module[] = [
    {
        title: 'Vectors',
        items: [
            {
                id: 'vectors',
                type: "lesson",
                title: "Lesson: Vectors",
                listing: "Vectors",
                prerequisites: [],
                path: "/lesson/vectors",
                component: VectorLesson,
                meta: null,
                xp: 25
            },
            {
                id: "vectors-quiz",
                type: "quiz",
                title: "Quiz: Vectors",
                listing: "Vectors Quiz",
                prerequisites: ['vectors'],
                path: "/quiz/vectors",
                component: VectorQuiz,
                meta: {
                    total: 2
                },
                xp: 15
            }
        ]
    },
    {
        title: 'Dot Product',
        items: [
            {
                id: 'dot-product',
                type: "lesson",
                title: "Lesson: Dot Product",
                listing: "Dot Product",
                prerequisites: ['vectors-quiz'],
                path: "/lesson/dot-product",
                component: DotProductLesson,
                meta: null,
                xp: 25
            },
            {
                id: 'dot-product-quiz',
                type: "quiz",
                title: "Quiz: Dot Product",
                listing: "Dot Product",
                prerequisites: ['dot-product'],
                path: "/quiz/dot-product",
                component: DotProductQuiz,
                meta: {
                    total: 3
                },
                xp: 20
            }
        ]
    },
    {
        title: 'Gradients',
        items: [
            {
                id: 'gradient',
                type: "lesson",
                title: "Lesson: Gradients",
                listing: "Gradient",
                prerequisites: ['dot-product-quiz'],
                path: "/lesson/gradient",
                component: GradientLesson,
                meta: null,
                xp: 25
            },
            {
                id: 'gradient-quiz',
                type: "quiz",
                title: "Quiz: Gradients",
                listing: "Gradients Quiz",
                prerequisites: ['gradient'],
                path: "/quiz/gradient",
                component: GradientQuiz,
                meta: {
                    total: 3
                },
                xp: 20
            }
        ]
    },
    {
        title: 'Matrix Multiplication',
        items: [
            {
                id: 'matrix',
                type: "lesson",
                title: "Lesson: Matrix Multiplication",
                listing: "Gradient",
                prerequisites: ['gradient-quiz'],
                path: "/lesson/gradient",
                component: GradientLesson,
                meta: null,
                xp: 25
            },
            {
                id: 'gradient-quiz',
                type: "quiz",
                title: "Quiz: Gradients",
                listing: "Gradients Quiz",
                prerequisites: ['matrix'],
                path: "/quiz/gradient",
                component: GradientQuiz,
                meta: {
                    total: 3
                },
                xp: 20
            }
        ]
    },
    {
        title: 'Linear Combinations',
        items: [
            {
                id: 'linear-combinations',
                type: "lesson",
                title: "Lesson: Linear Combinations",
                listing: "Linear Combinations",
                prerequisites: ['matrix-quiz'],
                path: "/lesson/linear-combinations",
                component: LinearCombinationLesson,
                meta: null,
                xp: 25
            },
            {
                id: 'linear-combinations-quiz',
                type: "quiz",
                title: "Quiz: Linear Combinations",
                listing: "Linear Combinations Quiz",
                prerequisites: ['linear-combinations'],
                path: "/quiz/linear-combinations",
                component: LinearCombinationQuiz,
                meta: {
                    total: 3
                },
                xp: 20
            }
        ]
    },
    {
        title: 'Span and Basis',
        items: [
            {
                id: 'span-basis',
                type: "lesson",
                title: "Lesson: Span and Basis",
                listing: "Span and Basis",
                prerequisites: ['linear-combinations-quiz'],
                path: "/lesson/span-basis",
                component: SpanBasisLesson,
                meta: null,
                xp: 25
            },
            {
                id: 'span-basis-quiz',
                type: "quiz",
                title: "Quiz: Span and Basis",
                listing: "Span and Basis Quiz",
                prerequisites: ['span-basis'],
                path: "/quiz/span-basis",
                component: SpanBasisQuiz,
                meta: {
                    total: 3
                },
                xp: 20
            }
        ]
    },
    {
        title: 'Vector Projections',
        items: [
            {
                id: 'projections',
                type: "lesson",
                title: "Lesson: Vector Projections",
                listing: "Vector Projections",
                prerequisites: ['span-basis-quiz'],
                path: "/lesson/projections",
                component: ProjectionLesson,
                meta: null,
                xp: 25
            },
            {
                id: 'projections-quiz',
                type: "quiz",
                title: "Quiz: Vector Projections",
                listing: "Vector Projections Quiz",
                prerequisites: ['projections'],
                path: "/quiz/projections",
                component: ProjectionQuiz,
                meta: {
                    total: 3
                },
                xp: 20
            }
        ]
    },
]

export const allItems = modules.flatMap(m => m.items);
export const lessons = allItems.filter(item => item.type === 'lesson');
export const lessonIds = lessons.map(item => item.id);
export const quizzes = allItems.filter(item => item.type === 'quiz');
export const quizIds = quizzes.map(item => item.id);
