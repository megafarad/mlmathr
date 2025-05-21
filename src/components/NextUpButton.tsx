import React from "react";
import {useXp} from "./context/XpContext.tsx";
import {Link} from "react-router-dom";

type Props = {
    currentLessonId: string;
}

const NextUpButton: React.FC<Props> = ({currentLessonId}) => {
    const {nextUp} =  useXp();
    const nextItem = nextUp(currentLessonId);

    return (
        nextItem && (
            <div className='mt-6 flex'>
                <Link
                    to={nextItem.path}
                    className='inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                >Next up: {nextItem.title}</Link>
            </div>
        )
    )
}

export default NextUpButton;