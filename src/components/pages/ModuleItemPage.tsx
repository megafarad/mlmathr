import React from "react";
import type {ModuleItem} from "../../modules.tsx";
import PrivateRoute from "../PrivateRoute.tsx";
import Meta from "../Meta.tsx";
import {constructUrl} from "../../constructUrl.ts";

interface ModuleItemPageProps {
    item: ModuleItem;
}

const ModuleItemPage: React.FC<ModuleItemPageProps> = ({item}) => {

    const title = item.listing + (item.type === 'lesson' ? ' | MLMathr Lesson' : ' | MLMathr Quiz');

    return (
        <PrivateRoute>
            <>
                <Meta
                    title={title}
                    description={item.description}
                    image={"/public/logo.png"}
                    url={constructUrl(item.path)}/>
                {item.element}
            </>
        </PrivateRoute>)
}

export default ModuleItemPage;
