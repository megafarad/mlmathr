import type {ReactElement} from "react";
import VectorLesson from "./components/lessons/VectorLesson.tsx";
import VectorQuiz from "./components/quizzes/VectorQuiz.tsx";
import DotProductLesson from "./components/lessons/DotProductLesson.tsx";
import DotProductQuiz from "./components/quizzes/DotProductQuiz.tsx";
import GradientLesson from "./components/lessons/GradientLesson.tsx";
import GradientQuiz from "./components/quizzes/GradientQuiz.tsx";
import LinearCombinationLesson from "./components/lessons/LinearCombinationLesson.tsx";
import LinearCombinationQuiz from "./components/quizzes/LinearCombinationQuiz.tsx";
import SpanBasisDimensionLesson from "./components/lessons/SpanBasisDimensionLesson.tsx";
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
import MatrixInversesLesson from "./components/lessons/MatrixInversesLesson.tsx";
import MatrixInversesQuiz from "./components/quizzes/MatrixInversesQuiz.tsx";
import MatrixRankLesson from "./components/lessons/MatrixRankLesson.tsx";
import MatrixRankQuiz from "./components/quizzes/MatrixRankQuiz.tsx";
import EigenvectorsLesson from "./components/lessons/EigenvectorsLesson.tsx";
import EigenvectorsQuiz from "./components/quizzes/EigenvectorsQuiz.tsx";
import ChangeOfBasisLesson from "./components/lessons/ChangeOfBasisLesson.tsx";
import ChangeOfBasisQuiz from "./components/quizzes/ChangeOfBasisQuiz.tsx";
import NullColumnSpaceLesson from "./components/lessons/NullColumnSpaceLesson.tsx";
import NullColumnSpaceQuiz from "./components/quizzes/NullColumnSpaceQuiz.tsx";


type LessonItem = {
    id: string;
    type: 'lesson';
    title: string;
    description: string;
    listing: string;
    prerequisites: string[];
    path: string;
    element: ReactElement;
    xp: number;
}

type QuizItem = {
    id: string;
    type: 'quiz';
    title: string;
    description: string;
    listing: string;
    prerequisites: string[];
    path: string;
    element: ReactElement;
    numberOfQuestions: number;
    xp: number;
}

export type ModuleItem = LessonItem | QuizItem;

type Module = {
    title: string;
    description: string;
    items: ModuleItem[];
}

export const modules: Module[] = [
    {
        title: 'Vectors & Geometry',
        description: ' Build a strong foundation in vectors, direction, magnitude, and inner product concepts. This module introduces the geometric intuition behind vectors and prepares you for deeper linear algebra topics.',
        items: [
            {
                id: 'vectors',
                type: "lesson",
                title: "Lesson: Vectors",
                listing: "Vectors",
                prerequisites: [],
                path: "/lesson/vectors",
                element: <VectorLesson/>,
                description: "Explore the basics of vectors in 2D space and learn how to manipulate them visually.",
                xp: 25
            },
            {
                id: "vectors-quiz",
                type: "quiz",
                title: "Quiz: Vectors",
                description: "Test your understanding of vector direction and magnitude.",
                listing: "Vectors",
                prerequisites: ['vectors'],
                path: "/quiz/vectors",
                element: <VectorQuiz/>,
                numberOfQuestions: 2,
                xp: 15
            },
            {
                id: 'dot-product',
                type: "lesson",
                title: "Lesson: Dot Product",
                description: "Visualize how the dot product relates to angle and projection between two vectors.",
                listing: "Dot Product",
                prerequisites: ['vectors-quiz'],
                path: "/lesson/dot-product",
                element: <DotProductLesson/>,
                xp: 25
            },
            {
                id: 'dot-product-quiz',
                type: "quiz",
                title: "Quiz: Dot Product",
                description: "Reinforce your grasp of the dot product with interactive questions.",
                listing: "Dot Product",
                prerequisites: ['dot-product'],
                path: "/quiz/dot-product",
                element: <DotProductQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            },
            {
                id: 'projections',
                type: "lesson",
                title: "Lesson: Vector Projections",
                description: "Learn how to project one vector onto another and understand the math behind it.",
                listing: "Vector Projections",
                prerequisites: ['dot-product-quiz'],
                path: "/lesson/projections",
                element: <ProjectionLesson/>,
                xp: 25
            },
            {
                id: 'projections-quiz',
                type: "quiz",
                title: "Quiz: Vector Projections",
                description: "Practice identifying and calculating vector projections.",
                listing: "Vector Projections",
                prerequisites: ['projections'],
                path: "/quiz/projections",
                element: <ProjectionQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            }
        ]
    },
    {
        title: 'Rates & Direction',
        description: 'Explore gradients and their connection to slopes and directionality. Learn how vectors can represent change and direction in multi-dimensional spaces.',
        items: [
            {
                id: 'gradient',
                type: "lesson",
                title: "Lesson: Gradients",
                description: "Understand gradients as direction and rate of change in 2D functions.",
                listing: "Gradients",
                prerequisites: ['projections-quiz'],
                path: "/lesson/gradient",
                element: <GradientLesson/>,
                xp: 25
            },
            {
                id: 'gradient-quiz',
                type: "quiz",
                title: "Quiz: Gradients",
                description: "Assess your knowledge of gradient direction and how it's used in optimization.",
                listing: "Gradients",
                prerequisites: ['gradient'],
                path: "/quiz/gradient",
                element: <GradientQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            }
        ]
    },
    {
        title: 'Vector Combinations & Spaces',
        description: 'Discover how vectors can combine to form new spaces. This module dives into linear combinations, span, basis, and how vectors define and relate to subspaces.',
        items: [
            {
                id: 'linear-combinations',
                type: "lesson",
                title: "Lesson: Linear Combinations",
                description: "See how vectors combine through scaling and addition to form new directions.",
                listing: "Linear Combinations",
                prerequisites: ['gradient-quiz'],
                path: "/lesson/linear-combinations",
                element: <LinearCombinationLesson/>,
                xp: 25
            },
            {
                id: 'linear-combinations-quiz',
                type: "quiz",
                title: "Quiz: Linear Combinations",
                description: "Test your ability to recognize linear combinations visually and numerically.",
                listing: "Linear Combinations",
                prerequisites: ['linear-combinations'],
                path: "/quiz/linear-combinations",
                element: <LinearCombinationQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            },
            {
                id: 'span-basis',
                type: "lesson",
                title: "Lesson: Span, Basis, & Dimension",
                description: "Explore how vectors span a space, define a basis, and determine dimensionality.",
                listing: "Span, Basis, & Dimension",
                prerequisites: ['linear-combinations-quiz'],
                path: "/lesson/span-basis",
                element: <SpanBasisDimensionLesson/>,
                xp: 25
            },
            {
                id: 'span-basis-quiz',
                type: "quiz",
                title: "Quiz: Span, Basis & Dimension",
                description: "Challenge your understanding of independence, span, and basis vectors.",
                listing: "Span and Basis",
                prerequisites: ['span-basis'],
                path: "/quiz/span-basis",
                element: <SpanBasisQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            },
            {
                id: 'change-of-basis',
                type: 'lesson',
                title: 'Lesson: Change of Basis',
                description: "Learn how to express vectors in new bases and translate between coordinate systems.",
                listing: 'Change of Basis',
                prerequisites: ['span-basis-quiz'],
                path: '/lesson/change-of-basis',
                element: <ChangeOfBasisLesson/>,
                xp: 25
            },
            {
                id: 'change-of-basis-quiz',
                type: 'quiz',
                title: 'Quiz: Change of Basis',
                description: "Practice interpreting and converting coordinates across different bases.",
                listing: 'Change of Basis',
                prerequisites: ['change-of-basis'],
                path: '/quiz/change-of-basis',
                element: <ChangeOfBasisQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            }
        ]
    },
    {
        title: "Matrix Transformations",
        description: "See how matrices transform space through rotation, scaling, and projection. You'll also learn how to switch coordinate systems and explore the structure of null and column spaces.",
        items: [
            {
                id: 'matrix-transformations',
                type: "lesson",
                title: "Lesson: Matrix Transformations",
                description: "Discover how matrices stretch, rotate, and reflect vectors in space.",
                listing: "Matrix Transformations",
                prerequisites: ['change-of-basis-quiz'],
                path: "/lesson/matrix-transformations",
                element: <MatrixTransformationsLesson/>,
                xp: 25
            },
            {
                id: 'matrix-transformations-quiz',
                type: "quiz",
                title: "Quiz: Matrix Transformations",
                description: "Quiz your intuition about the effects of different matrices.",
                listing: "Matrix Transformations",
                prerequisites: ['matrix-transformations'],
                path: "/quiz/matrix-transformations",
                element: <MatrixTransformationsQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            },
            {
                id: 'null-column-space',
                type: 'lesson',
                title: 'Lesson: Null Space & Column Space',
                description: "Explore the vectors a matrix sends to zero and the ones it can produce.",
                listing: 'Null Space & Column Space',
                prerequisites: ['matrix-transformations-quiz'],
                path: '/lesson/null-column-space',
                element: <NullColumnSpaceLesson/>,
                xp: 25
            },
            {
                id: 'null-column-space-quiz',
                type: 'quiz',
                title: 'Quiz: Null Space & Column Space',
                description: "Test your grasp of null space and column space concepts.",
                listing: 'Null Space & Column Space',
                prerequisites: ['null-column-space'],
                path: '/quiz/null-column-space',
                element: <NullColumnSpaceQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            },
        ]
    },
    {
        title: 'Matrix Operations',
        description: "Learn how to compute with matrices — including multiplication, determinants, inverses, and other foundational tools. These operations will power the way you manipulate space and data throughout linear algebra.",
        items: [
            {
                id: 'matrix-multiplication-basics',
                type: 'lesson',
                title: 'Lesson: Multiplying Two Matrices',
                description: "Understand the core rules of matrix multiplication and how dimensions interact.",
                listing: 'Multiplying Two Matrices',
                prerequisites: ['null-column-space-quiz'],
                path: '/lesson/matrix-multiplication-basics',
                element: <MatrixMultiplicationLesson/>,
                xp: 25
            },
            {
                id: 'matrix-multiplication-basics-quiz',
                type: 'quiz',
                description: "Practice identifying valid matrix multiplications and predicting results.",
                title: 'Quiz: Multiplying Two Matrices',
                listing: 'Multiplying Two Matrices',
                prerequisites: ['matrix-multiplication-basics'],
                path: '/quiz/matrix-multiplication-basics',
                element: <MatrixMultiplicationQuiz/>,
                numberOfQuestions: 4,
                xp: 20
            },
            {
                id: 'matrix-transformation-order',
                type: "lesson",
                title: "Lesson: Matrix Transformation Order",
                description: "Learn how the order of matrix multiplication affects outcomes.",
                listing: "Matrix Transformation Order",
                prerequisites: ['matrix-multiplication-basics-quiz'],
                path: "/lesson/matrix-transformation-order",
                element: <MatrixTransformationOrderLesson/>,
                xp: 25
            },
            {
                id: 'matrix-transformation-order-quiz',
                type: 'quiz',
                title: 'Quiz: Matrix Transformation Order',
                description: "Test your ability to reason through multiple matrix applications.",
                listing: 'Matrix Transformation Order',
                prerequisites: ['matrix-transformation-order'],
                path: '/quiz/matrix-transformation-order',
                element: <MatrixTransformationOrderQuiz/>,
                numberOfQuestions: 4,
                xp: 20
            },
            {
                id: 'determinants',
                type: 'lesson',
                title: 'Lesson: Determinants',
                description: "Visualize how determinants represent area scaling and orientation.",
                listing: 'Determinants',
                prerequisites: ['matrix-transformation-order-quiz'],
                path: '/lesson/determinants',
                element: <DeterminantsLesson/>,
                xp: 25
            },
            {
                id: 'determinants-quiz',
                type: 'quiz',
                title: 'Quiz: Determinants',
                description: "Check your knowledge of determinant calculation and geometric meaning.",
                listing: 'Determinants',
                prerequisites: ['determinants'],
                path: '/quiz/determinants',
                element: <DeterminantsQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            },
            {
                id: 'matrix-inverses',
                type: 'lesson',
                title: 'Lesson: Matrix Inverses',
                description: "Explore when and how a matrix can reverse its transformations.",
                listing: 'Matrix Inverses',
                prerequisites: ['determinants-quiz'],
                path: '/lesson/matrix-inverses',
                element: <MatrixInversesLesson/>,
                xp: 25
            },
            {
                id: 'matrix-inverses-quiz',
                type: 'quiz',
                title: 'Quiz: Matrix Inverses',
                description: "Evaluate your ability to reason about invertibility and matrix reversal.",
                listing: 'Matrix Inverses',
                prerequisites: ['matrix-inverses'],
                path: '/quiz/matrix-inverses',
                element: <MatrixInversesQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            }
        ]
    },
    {
        title: "Matrix Properties & Structure",
        description: "Explore what matrices reveal about space — from dimensionality and independence to special directions that resist change. This module focuses on the deeper structure and meaning behind matrices.",
        items: [
            {
                id: 'matrix-rank',
                type: 'lesson',
                title: 'Lesson: Matrix Rank',
                description: "Learn how rank reflects the number of independent directions in a matrix.",
                listing: 'Matrix Rank',
                prerequisites: ['matrix-inverses-quiz'],
                path: '/lesson/matrix-rank',
                element: <MatrixRankLesson/>,
                xp: 25
            },
            {
                id: 'matrix-rank-quiz',
                type: 'quiz',
                title: 'Quiz: Matrix Rank',
                description: "Test your skills in identifying full rank, reduced rank, and implications.",
                listing: 'Matrix Rank',
                prerequisites: ['matrix-rank'],
                path: '/quiz/matrix-rank',
                element: <MatrixRankQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            },
            {
                id: 'eigenvectors',
                type: 'lesson',
                title: 'Lesson: Eigenvectors & Eigenvalues',
                description: "Explore special vectors that stay on their span under transformation.",
                listing: 'Eigenvectors & Eigenvalues',
                prerequisites: ['matrix-rank-quiz'],
                path: '/lesson/eigenvectors',
                element: <EigenvectorsLesson/>,
                xp: 25
            },
            {
                id: 'eigenvectors-quiz',
                type: 'quiz',
                title: 'Quiz: Eigenvectors & Eigenvalues',
                description: "Practice identifying eigenvectors and calculating eigenvalues.",
                listing: 'Eigenvectors & Eigenvalues',
                prerequisites: ['eigenvectors'],
                path: '/quiz/eigenvectors',
                element: <EigenvectorsQuiz/>,
                numberOfQuestions: 3,
                xp: 20
            }
        ]
    }
]

export const allItems = modules.flatMap(m => m.items);
export const lessons = allItems.filter(item => item.type === 'lesson');
export const lessonIds = lessons.map(item => item.id);
export const quizzes = allItems.filter(item => item.type === 'quiz');
export const quizIds = quizzes.map(item => item.id);
