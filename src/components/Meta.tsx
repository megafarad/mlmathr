import React from "react";

type MetaProps = {
    title: string;
    description: string;
    image: string;
    url: string;
}

const Meta: React.FC<MetaProps> = ({title, description, image, url}) => {

    return (
        <>
            <title>{title}</title>

            <meta name="description" content={description} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

        </>
    )
}

export default Meta;