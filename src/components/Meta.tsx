import React from "react";

type MetaProps = {
    title: string;
    description: string;
    image: string;
}

const Meta: React.FC<MetaProps> = ({title, description, image}) => {

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
        </>
    )
}

export default Meta;