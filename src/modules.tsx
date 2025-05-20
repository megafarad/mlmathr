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
import MatrixTransformationsLesson from "./components/lessons/MatrixTransformationsLesson.tsx";
import MatrixTransformationsQuiz from "./components/quizzes/MatrixTransformationsQuiz.tsx";
import MatrixTransformationOrderLesson from "./components/lessons/MatrixTransformationOrderLesson.tsx";
import MatrixMultiplicationLesson from "./components/lessons/MatrixMultiplicationLesson.tsx";
import MatrixMultiplicationQuiz from "./components/quizzes/MatrixMultiplicationQuiz.tsx";
import MatrixTransformationOrderQuiz from "./components/quizzes/MatrixTransformationOrderQuiz.tsx";
import DeterminantsLesson from "./components/lessons/DeterminantsLesson.tsx";
import DeterminantsQuiz from "./components/quizzes/DeterminantsQuiz.tsx";

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

export type ModuleItem = LessonItem | QuizItem;

type Module = {
    title: string;
    items: ModuleItem[];
}

export const modules: Module[] = [
    {
        title: 'Vectors & Geometry',
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
            },
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
                listing: "Dot Product Quiz",
                prerequisites: ['dot-product'],
                path: "/quiz/dot-product",
                component: DotProductQuiz,
                meta: {
                    total: 3
                },
                xp: 20
            },
            {
                id: 'projections',
                type: "lesson",
                title: "Lesson: Vector Projections",
                listing: "Vector Projections",
                prerequisites: ['dot-product-quiz'],
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
    {
        title: 'Rates & Direction',
        items: [
            {
                id: 'gradient',
                type: "lesson",
                title: "Lesson: Gradients",
                listing: "Gradient",
                prerequisites: ['projections-quiz'],
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
        title: 'Vector Combinations & Spaces',
        items: [
            {
                id: 'linear-combinations',
                type: "lesson",
                title: "Lesson: Linear Combinations",
                listing: "Linear Combinations",
                prerequisites: ['gradient-quiz'],
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
            },
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
        title: "Matrix Transformations",
        items: [
            {
                id: 'matrix-transformations',
                type: "lesson",
                title: "Lesson: Matrix Transformations",
                listing: "Matrix Transformations",
                prerequisites: ['span-basis-quiz'],
                path: "/lesson/matrix-transformations",
                component: MatrixTransformationsLesson,
                meta: null,
                xp: 25
            },
            {
                id: 'matrix-transformations-quiz',
                type: "quiz",
                title: "Quiz: Matrix Transformations",
                listing: "Matrix Transformations Quiz",
                prerequisites: ['matrix-transformations'],
                path: "/quiz/matrix-transformations",
                component: MatrixTransformationsQuiz,
                meta: {
                    total: 3
                },
                xp: 20
            },
            {
                id: 'matrix-transformation-order',
                type: "lesson",
                title: "Lesson: Matrix Transformation Order",
                listing: "Matrix Transformation Order",
                prerequisites: ['matrix-transformations-quiz'],
                path: "/lesson/matrix-transformation-order",
                component: MatrixTransformationOrderLesson,
                meta: null,
                xp: 25
            },
            {
                id: 'matrix-transformation-order-quiz',
                type: 'quiz',
                title: 'Quiz: Matrix Transformation Order',
                listing: 'Matrix Transformation Order Quiz',
                prerequisites: ['matrix-transformation-order'],
                path: '/quiz/matrix-transformation-order',
                component: MatrixTransformationOrderQuiz,
                meta: {
                    total: 4
                },
                xp: 20
            },
        ]
    },
    {
        title: 'Matrix Computation',
        items: [
            {
                id: 'matrix-multiplication-basics',
                type: 'lesson',
                title: 'Lesson: Multiplying Two Matrices',
                listing: 'Multiplying Two Matrices',
                prerequisites: ['matrix-transformation-order-quiz'],
                path: '/lesson/matrix-multiplication-basics',
                component: MatrixMultiplicationLesson,
                meta: null,
                xp: 25
            },
            {
                id: 'matrix-multiplication-basics-quiz',
                type: 'quiz',
                title: 'Quiz: Multiplying Two Matrices',
                listing: 'Multiplying Two Matrices Quiz',
                prerequisites: ['matrix-multiplication-basics'],
                path: '/quiz/matrix-multiplication-basics',
                component: MatrixMultiplicationQuiz,
                meta: {
                    total: 4
                },
                xp: 20
            },
            {
                id: 'determinants',
                type: 'lesson',
                title: 'Lesson: Determinants',
                listing: 'Determinants Lesson',
                prerequisites: ['matrix-transformation-order-quiz'],
                path: '/lesson/determinants',
                component: DeterminantsLesson,
                meta: null,
                xp: 25
            },
            {
                id: 'determinants-quiz',
                type: 'quiz',
                title: 'Quiz: Determinants',
                listing: 'Determinants Quiz',
                prerequisites: ['determinants'],
                path: '/quiz/determinants',
                component: DeterminantsQuiz,
                meta: {
                    total: 3
                },
                xp: 20
            },
        ]
    }
]

export const allItems = modules.flatMap(m => m.items);
export const lessons = allItems.filter(item => item.type === 'lesson');
export const lessonIds = lessons.map(item => item.id);
export const quizzes = allItems.filter(item => item.type === 'quiz');
export const quizIds = quizzes.map(item => item.id);
