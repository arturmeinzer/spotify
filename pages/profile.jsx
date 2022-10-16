import React, { useEffect, useRef } from "react";
import SpotifyDataFetcher from "../utils/SpotifyDataFetcher";
import BaseLayout from "../components/BaseLayout";

const Profile = () => {
    const shouldFetch = useRef(true);

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            const dataFetcher = new SpotifyDataFetcher();
            dataFetcher.getUser().then((response) => {
                // eslint-disable-next-line no-console
                console.log(response.data);
            });
        }
    }, []);

    return (
        <BaseLayout>
            Profile
        </BaseLayout>
    );
};

export default Profile;
