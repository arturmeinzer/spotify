import React, { useEffect, useRef } from "react";
import BaseLayout from "../../components/BaseLayout";

const PlaylistDetail = () => {
    const shouldFetch = useRef(true);

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            // eslint-disable-next-line no-console
            console.log("fetch playlist");
        }
    }, []);

    return (
        <BaseLayout>
            Playlist
        </BaseLayout>
    );
};

export default PlaylistDetail;
