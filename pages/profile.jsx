import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SpotifyDataFetcher from "../utils/SpotifyDataFetcher";
import BaseLayout from "../components/BaseLayout";
import withAuth from "../hoc/withAuth";
import Header from "../components/Header";
import Artist from "../components/Artist";
import { SIZE_SMALL } from "../constants/imageSizes";
import TrackItem from "../components/TrackItem";
import AppLink from "../components/AppLink";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const shouldFetch = useRef(true);

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            const dataFetcher = new SpotifyDataFetcher();
            dataFetcher.getUserInfo().then((response) => {
                // eslint-disable-next-line no-console
                console.log(response);
                const { user, topArtists, topTracks } = response;
                setProfileData({
                    user,
                    topArtists,
                    topTracks,
                });
            });
        }
    }, []);

    if (profileData === null) {
        return (
            <BaseLayout>
                Loading...
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <Header title={profileData.user.display_name} />
            <AppLink href="/logout">
                <Button>Logout</Button>
            </AppLink>
            <Stack gap="20px" sx={{ flexDirection: { xs: "column", md: "row" } }}>
                <Stack gap={3} flex="50%">
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6" as="h2">Top Artists of All Time</Typography>
                        <AppLink href="/artists">
                            <Button variant="outlined" color="success">See More</Button>
                        </AppLink>
                    </Stack>
                    {profileData.topArtists.items.map(
                        (artist) => <Artist key={artist.id} size={SIZE_SMALL} direction="row" artist={artist} />,
                    )}
                </Stack>
                <Stack gap={3} flex="50%">
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6" as="h2">Top Tracks of All Time</Typography>
                        <AppLink href="/tracks">
                            <Button variant="outlined" color="success">See More</Button>
                        </AppLink>
                    </Stack>
                    {profileData.topTracks.items.map(
                        (track) => <TrackItem key={track.id} track={track} />,
                    )}
                </Stack>
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(Profile);
