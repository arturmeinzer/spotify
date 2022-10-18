import React, { useContext, useEffect, useRef } from "react";
import BaseLayout from "../../layouts/BaseLayout";
import DataContext from "../../context/DataContext";

const PlaylistDetail = () => {
    const shouldFetch = useRef(true);
    const dataFetcher = useContext(DataContext);

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            // eslint-disable-next-line no-console
            console.log("fetch playlist");
        }
    }, [dataFetcher]);

    return (
        <BaseLayout>
            Playlist
        </BaseLayout>
    );
};

export default PlaylistDetail;
